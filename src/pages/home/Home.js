import React, { useCallback, useEffect, useState } from "react"
import { ListItem, Loading, TextInput } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { Button, Checkbox, Layout, Modal, Row } from "antd"
import "./home.stylesheet.sass"
import { actions as homeActions } from "./index"
import validator from "../../utils/validator"

export default function Home () {
  // states
  const [visible, setVisible] = useState(false)
  const [checkedHigh, setHigh] = useState(true)
  const [checkedMed, setMed] = useState(false)
  const [checkedLow, setLow] = useState(false)
  const [task, setTask] = useState("")
  const [checkedValue, setCheckedValue] = useState("high")
  const [taskError, setTaskError] = useState("")
  const [searchWord, setSearchWord] = useState("")
  const [searchArray, setSearchArray] = useState([])

  const { isLoading } = useSelector((state) => state.login)
  const { tasks } = useSelector((state) => state.home)
  const dispatch = useDispatch()

  // functions
  function addToList () {
    const taskItem = {
      name: task,
      priority: checkedValue
    }
    const errorTask = validator("homeTask", task)
    setTaskError(errorTask)
    if (!errorTask) {
      dispatch((homeActions.addTaskREQUEST(taskItem)))
      setVisible(false)
    }
  }

  function cleanState () {
    setHigh(true)
    setMed(false)
    setLow(false)
    setCheckedValue("High")
    setTask("")
  }

  useEffect(() => {
    if (searchWord) {
      const searchTask = tasks.filter(task => {
        const nameSliceArray = task.name.toLowerCase().match(searchWord.toLowerCase())
        return nameSliceArray
      })
      setSearchArray(searchTask)
    }
  }, [searchWord])

  const onChange = useCallback(e => {
    if (e.target.value === "high") {
      setHigh(true)
      setMed(false)
      setLow(false)
      setCheckedValue("High")
    } else if (e.target.value === "med") {
      setHigh(false)
      setMed(true)
      setLow(false)
      setCheckedValue("Med")
    } else {
      setHigh(false)
      setMed(false)
      setLow(true)
      setCheckedValue("Low")
    }
  }, [])

  useEffect(() => {
    if (task) {
      const errorTask = validator("homeTask", task)
      setTaskError(errorTask)
    }
  }, [task])

  return isLoading
    ? <Loading />
    : <Layout className="home-container">
        <Row className="home-container__title-wrapper">
          <div className="home-container__title-wrapper__title">
            Marketing Campaign
          </div>
        </Row>
        <Row className="home-container__content-wrapper">
          <Row className="home-container__content-wrapper__header-wrapper">
            <Button onClick={() => {
              setVisible(true)
              cleanState()
            }} className="home-container__content-wrapper__header-wrapper__button">
              AddTask
            </Button>
            <TextInput inputClassname="home-container__content-wrapper__header-wrapper__search" placeholder="search task" onChange={setSearchWord} />
            <div className="home-container__content-wrapper__header-wrapper__text">priority</div>
          </Row>
          {
            searchWord
              ? searchArray.map(task => <ListItem key={task.name} name={task.name} state={task.priority} />)
              : tasks.map(task => <ListItem key={task.name} name={task.name} state={task.priority} />)
          }
        </Row>
        <Modal
            title="Add Task"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={500}
            footer={[
              <Button key="back" onClick={() => setVisible(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={addToList} >
                Add to list
              </Button>
            ]}
        >
          <TextInput containerClassName="pop-up" isInvalid={taskError} label={"Please enter the task name"} errorMsg={taskError} required onChange={setTask} value={task}/>
          <Checkbox value="high" checked={checkedHigh} onChange={onChange}>Checked high</Checkbox>
          <Checkbox value="med" checked={checkedMed} onChange={onChange}>Checked med</Checkbox>
          <Checkbox value="low" checked={checkedLow} onChange={onChange}>Checked low</Checkbox>
        </Modal>
      </Layout>
}
