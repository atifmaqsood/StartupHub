import React from 'react'

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  size?: 'sm' | 'md' | 'lg'
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-white shadow-sm ring-1 ring-gray-100`}>
      {src ? (
        <img src={src} alt={alt || fallback} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-gray-600 uppercase">{fallback.substring(0, 2)}</span>
      )}
    </div>
  )
}

export default Avatar
