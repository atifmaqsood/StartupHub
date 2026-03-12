import React from 'react'

interface ColorPickerInputProps {
  label: string
  value: string
  onChange: (color: string) => void
}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
      <span className="text-sm font-bold text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{value}</span>
        <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-gray-200">
          <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPickerInput
