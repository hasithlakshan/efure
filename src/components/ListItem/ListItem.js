import React, { memo, useMemo } from "react"
import { Row, Col } from "antd"
import "./ListItems.stylesheet.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import PropTypes from "prop-types"

const ListItem = memo(({ name, state }) => {
  const checkBackgroundColor = useMemo(() => {
    if (state === "High") {
      return {
        backgroundColor: "#ff3333"
      }
    } else if (state === "Med") {
      return {
        backgroundColor: "#ffcc00"
      }
    } else {
      return {
        backgroundColor: "#1f7a1f"
      }
    }
  }, [state])

  return (
        <Row className="item-container">
            <Col span={18} className="item-container__name-wrapper">
                <FontAwesomeIcon className="item-container__name-wrapper__icon" size="2x" icon={faCheck}/>
                <span className="item-container__name-wrapper__name">{name}</span>
            </Col>
            <Col span={6} className="item-container__priority">
                 <span className="item-container__priority__name" style={checkBackgroundColor} >{state}</span>
            </Col>
        </Row>
  )
})

export default ListItem

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
}
