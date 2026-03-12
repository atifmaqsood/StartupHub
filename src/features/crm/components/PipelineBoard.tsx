import React, { useState } from 'react'
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
import { useDispatch } from 'react-redux'
import { reorderLeads } from '../../../store/crmSlice.ts'
import { crmService } from '../../../services/crmService.ts'

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
  const dispatch = useDispatch()
  const [activeLead, setActiveLead] = useState<any>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    
    dispatch(reorderLeads(newLeads))
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveLead(null)

    if (!over) return

    const activeId = active.id as string
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

      dispatch(reorderLeads(newLeads))
      
      try {
        await crmService.reorderLeads(newLeads)
      } catch (error) {
        console.error('Failed to persist lead reorder', error)
      }
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
