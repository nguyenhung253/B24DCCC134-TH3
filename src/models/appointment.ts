import { useState } from 'react'
import { message } from 'antd'

export default () => {

  // nhân viên mặc định
  const defaultEmployees = [
    {
      id: 1,
      name: 'Nhân viên A',
      times: ['09:00','10:00','11:00']
    },
    {
      id: 2,
      name: 'Nhân viên B',
      times: ['13:00','14:00','15:00']
    }
  ]

  // load từ localStorage
  const [employees, setEmployees] = useState<any[]>(
    JSON.parse(localStorage.getItem('employees') || JSON.stringify(defaultEmployees))
  )

  const [appointments, setAppointments] = useState<any[]>(
    JSON.parse(localStorage.getItem('appointments') || '[]')
  )

  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  //////////////////////////////
  // lưu localStorage

  const saveEmployees = (list:any[])=>{
    setEmployees(list)
    localStorage.setItem('employees',JSON.stringify(list))
  }

  const saveAppointments = (list:any[])=>{
    setAppointments(list)
    localStorage.setItem('appointments',JSON.stringify(list))
  }

  //////////////////////////////
  // thêm nhân viên

  const addEmployee = (name:string)=>{

    if(!name){
      message.error('Nhập tên nhân viên')
      return
    }

    const list=[
      ...employees,
      {
        id: Date.now(),
        name,
        times:[]
      }
    ]

    saveEmployees(list)
    message.success('Thêm nhân viên thành công')
  }

  //////////////////////////////
  // xóa nhân viên

  const deleteEmployee = (id:number)=>{
    const list = employees.filter(i=>i.id!==id)
    saveEmployees(list)
  }

  //////////////////////////////
  // thêm giờ làm

  const addTime = (id:number,time:string)=>{

    const list = employees.map(emp=>{

      if(emp.id===id){

        if(emp.times.includes(time)){
          message.error('Giờ đã tồn tại')
          return emp
        }

        return {
          ...emp,
          times:[...emp.times,time]
        }
      }

      return emp
    })

    saveEmployees(list)
  }

  //////////////////////////////
  // xóa giờ làm

  const deleteTime = (id:number,time:string)=>{

    const list = employees.map(emp=>{

      if(emp.id===id){
        return {
          ...emp,
          times: emp.times.filter((t:string)=>t!==time)
        }
      }

      return emp
    })

    saveEmployees(list)
  }

  //////////////////////////////
  // đặt lịch

  const addAppointment = (values:any)=>{

    if(!selected) return

    const exist = appointments.find(i=>
      i.employee===selected.employee &&
      i.time===selected.time &&
      i.status!=='Đã hủy'
    )

    if(exist){
      message.error('Giờ này đã có người đặt')
      return
    }

    const list=[
      ...appointments,
      {
        id: Date.now(),
        customer: values.customer,
        employee: selected.employee,
        time: selected.time,
        status: 'Chờ duyệt'
      }
    ]

    saveAppointments(list)
    setVisible(false)
    message.success('Đặt lịch thành công')
  }

  //////////////////////////////
  // hủy lịch

  const cancelAppointment = (id:number)=>{

    const list = appointments.map(i=>{
      if(i.id===id){
        return {...i,status:'Đã hủy'}
      }
      return i
    })

    saveAppointments(list)
  }

  //////////////////////////////
  // admin xác nhận

  const confirmAppointment = (id:number)=>{

    const list = appointments.map(i=>{
      if(i.id===id){
        return {...i,status:'Xác nhận'}
      }
      return i
    })

    saveAppointments(list)
  }

  //////////////////////////////
  // hoàn thành

  const finishAppointment = (id:number)=>{

    const list = appointments.map(i=>{
      if(i.id===id){
        return {...i,status:'Hoàn thành'}
      }
      return i
    })

    saveAppointments(list)
  }

  return {

    employees,
    addEmployee,
    deleteEmployee,
    addTime,
    deleteTime,

    appointments,

    visible,
    setVisible,
    selected,
    setSelected,

    addAppointment,
    cancelAppointment,
    confirmAppointment,
    finishAppointment
  }
}