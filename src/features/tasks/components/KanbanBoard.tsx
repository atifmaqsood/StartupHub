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
import KanbanColumn from './KanbanColumn.tsx'
import TaskCard from './TaskCard.tsx'
import { useDispatch } from 'react-redux'
import { optimisticReorderTasks, reorderTasksAsync } from '../../../store/taskSlice.ts'
import type { AppDispatch } from '../../../store/index.ts'

interface KanbanBoardProps {
  tasks: any[]
}

const COLUMNS = [
  { id: 'Todo', title: 'To Do', color: 'bg-gray-400' },
  { id: 'In Progress', title: 'In Progress', color: 'bg-yellow-400' },
  { id: 'Review', title: 'Review', color: 'bg-blue-400' },
  { id: 'Completed', title: 'Completed', color: 'bg-green-400' },
]

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [activeTask, setActiveTask] = useState<any>(null)

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
    if (COLUMNS.find((c) => c.id === id)) return id
    const task = tasks.find((t) => t.id === id)
    return task ? task.status : null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const task = tasks.find((t) => t.id === active.id)
    setActiveTask(task)
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

    // Moving between columns
    const activeIndex = tasks.findIndex((t) => t.id === activeId)
    const newTasks = [...tasks]
    const updatedTask = { ...newTasks[activeIndex], status: overContainer }
    newTasks[activeIndex] = updatedTask
    
    // We update Redux immediately for smooth transition
    dispatch(optimisticReorderTasks(newTasks))
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer) return

    const activeIndex = tasks.findIndex((t) => t.id === activeId)
    const overIndex = tasks.findIndex((t) => t.id === overId)

    let newTasks = [...tasks]

    if (activeId !== overId) {
      if (overIndex !== -1) {
        // Dropped over another task - Reorder
        newTasks = arrayMove(tasks, activeIndex, overIndex)
        // Ensure the status is updated if moved to a different column
        if (newTasks[overIndex].status !== overContainer) {
          newTasks[overIndex] = { ...newTasks[overIndex], status: overContainer }
        }
      } else {
        // Dropped over a column - Move to end
        const updatedTask = { ...newTasks[activeIndex], status: overContainer }
        newTasks.splice(activeIndex, 1)
        newTasks.push(updatedTask)
      }

      dispatch(optimisticReorderTasks(newTasks))
      dispatch(reorderTasksAsync(newTasks))
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
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            color={col.color}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={{
          duration: 250,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
        {activeTask ? (
          <div className="rotate-3 shadow-2xl ring-2 ring-primary">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default KanbanBoard
