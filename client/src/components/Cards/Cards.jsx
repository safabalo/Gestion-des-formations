import React from 'react'

export default function Cards({data, name}) {
  console.log(data)
  console.log(name)
  return (
    <div>
        <p className="block max-w-sm py-8 px-24 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-4 text-left text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            <p className="text-blue-600 dark:text-gray-400 text-right font-bold text-3xl">
              {data}
              </p>
        </p>
    </div>
  )
}
