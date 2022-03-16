const TaskObject = function TaskObject(nameTask, idCreator, nameCretor, decripstionTask
    ,status, prioritizeTask, dateStart, dateEnd, timeComplete,unitTimeComplete
    ,unitTimeRepeat, timePerRepeat, hour, employees, historyTask) {
    this.nameTask = nameTask
    this.idCreator = idCreator
    this.nameCretor= nameCretor
    this.decripstionTask = decripstionTask
    this.status = status
    this.prioritizeTask= prioritizeTask
    this.dateStart=dateStart
    this.dateEnd= dateEnd
    this.timeComplete= timeComplete
    this.unitTimeComplete= unitTimeComplete
    this.unitTimeRepeat=unitTimeRepeat
    this.timePerRepeat= timePerRepeat
    this.hour= hour
    this.employees=employees
    this.historyTask = historyTask
}
export default TaskObject