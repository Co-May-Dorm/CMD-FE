import React, { useEffect, useState } from 'react'
import tasksApi from '../../api/tasksApi'

const TaskDetail = ({ taskId }) => {
    const [taskInfo, setTaskInfo] = useState({})
    useEffect(() => {
        tasksApi.get(taskId)
            .then((response) => {
                setTaskInfo(response.data.data)
            })
    })

  return (
    <div>TaskDetail</div>
  )
}

export default TaskDetail