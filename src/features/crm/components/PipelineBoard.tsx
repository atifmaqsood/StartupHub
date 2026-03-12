import React, { useState, useMemo, useRef } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import PipelineColumn from './PipelineColumn.tsx'
import LeadCard from './LeadCard.tsx'
import { useAppDispatch } from '../../../hooks/redux.ts'
import { reorderLeadsAsync, optimisticReorderLeads } from '../../../store/crmSlice.ts'
import { useSystemNotification } from '../../../hooks/useSystemNotification'

interface PipelineBoardProps {
  leads: any[]
}

const STAGES = [
  { id: 'New Lead', title: 'New Lead', color: 'bg-blue-400' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-yellow-400' },
  { id: 'Negotiation', title: 'Negotiation', color: 'bg-purple-400' },
  { id: 'Won', title: 'Won', color: 'bg-green-500' },
  { id: 'Lost', title: 'Lost', color: 'bg-red-400' },
]

const PipelineBoard: React.FC<PipelineBoardProps> = ({ leads }) => {
  const dispatch = useAppDispatch()
  const { notify } = useSystemNotification()
  const [activeLead, setActiveLead] = useState<any>(null)
  const originalStatusRef = useRef<string | null>(null)

  const pointerSensorOptions = useMemo(() => ({
    activationConstraint: {
      distance: 8,
    },
  }), [])

  const keyboardSensorOptions = useMemo(() => ({
    coordinateGetter: sortableKeyboardCoordinates,
  }), [])

  const sensors = useSensors(
    useSensor(PointerSensor, pointerSensorOptions),
    useSensor(KeyboardSensor, keyboardSensorOptions)
  )

  const findContainer = (id: string) => {
    if (STAGES.find((s) => s.id === id)) return id
    const lead = leads.find((l) => l.id === id)
    return lead ? lead.status : null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const lead = leads.find((l) => l.id === active.id)
    setActiveLead(lead)
    originalStatusRef.current = lead ? lead.status : null
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return
    }

    const activeIndex = leads.findIndex((l) => l.id === activeId)
    const newLeads = [...leads]
    const updatedLead = { ...newLeads[activeIndex], status: overContainer }
    newLeads[activeIndex] = updatedLead
    
    dispatch(optimisticReorderLeads(newLeads))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveLead(null)

    const activeId = active.id as string
    const originalStatus = originalStatusRef.current

    if (!over) {
      if (originalStatus) {
        const leadItem = leads.find(l => l.id === activeId)
        if (leadItem && leadItem.status !== originalStatus) {
          const revertedLeads = leads.map(l => 
            l.id === activeId ? { ...l, status: originalStatus } : l
          )
          dispatch(optimisticReorderLeads(revertedLeads))
        }
      }
      return
    }

    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) return

    const activeIndex = leads.findIndex((l) => l.id === activeId)
    const overIndex = leads.findIndex((l) => l.id === overId)

    let newLeads = [...leads]

    if (activeId !== overId) {
      if (overIndex !== -1) {
        newLeads = arrayMove(leads, activeIndex, overIndex)
        if (newLeads[overIndex].status !== overContainer) {
          newLeads[overIndex] = { ...newLeads[overIndex], status: overContainer }
        }
      } else {
        const updatedLead = { ...newLeads[activeIndex], status: overContainer }
        newLeads.splice(activeIndex, 1)
        newLeads.push(updatedLead)
      }
    } else {
      if (newLeads[activeIndex].status !== overContainer) {
        newLeads[activeIndex] = { ...newLeads[activeIndex], status: overContainer }
      }
    }

    dispatch(optimisticReorderLeads(newLeads))
    dispatch(reorderLeadsAsync(newLeads))

    const lead = newLeads.find(l => l.id === activeId)
    if (lead && originalStatus && originalStatus !== overContainer) {
      notify(`Lead "${lead.name}" moved to ${overContainer}`, 'crm', activeId)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full pb-8 overflow-x-auto min-h-[calc(100vh-250px)] scrollbar-hide">
        {STAGES.map((stage) => (
          <PipelineColumn
            key={stage.id}
            id={stage.id}
            title={stage.title}
            color={stage.color}
            leads={leads.filter((l) => l.status === stage.id)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
          duration: 250,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
        {activeLead ? (
          <div className="rotate-2 shadow-2xl ring-2 ring-primary bg-white rounded-2xl">
            <LeadCard lead={activeLead} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default PipelineBoard
