import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RECENT_LIVE_LOG_API } from "utils/api/api";
import MainLayout from "./layout/MainLayout";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import TimeAgo from "react-timeago";
import { FaClock } from "react-icons/fa";
import { BsCalendarDateFill, BsPeopleFill } from "react-icons/bs";
import { AiFillGift } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";
import formatViews from "utils/formatViews";
import PaginationComponent from "parts/Pagination";
import formatLongDate from "utils/formatLongDate";

const LiveHistory = (props) => {
  const [logs, setLogs] = useState([]);
  const [sort, setSort] = useState("date");
  const [page, setPage] = useState("1");
  const [filter, setFilter] = useState("active");
  const [order, setOrder] = useState("-1");
  const [perPage, setPerpage] = useState(12);
  const [totalCount, setTotalCount] = useState("");

  useEffect(() => {
    async function getRoomList() {
      try {
        const history = await axios.get(
          RECENT_LIVE_LOG_API(sort, page, filter, order, perPage)
        );
        setLogs(history.data.recents);
        setPerpage(history.data.perpage);
        setTotalCount(history.data.total_count);
      } catch (error) {
        console.log(error);
      }
    }
    getRoomList();
    window.document.title = "LIVE HISTORY";
  }, [sort, page, filter, order, perPage, totalCount]);

  const getLiveDuration = (duration) => {
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  };

  return (
    <MainLayout {...props}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h3>Member Live History</h3>
          <PaginationComponent
            page={page}
            perPage={perPage}
            totalCount={totalCount}
            setPage={setPage}
          />
        </div>
        <Row>
          {logs.map((log, idx) => {
            const { member, live_info } = log;
            return (
              <Col key={idx} sm="6" md="4" className="py-3">
                <Card
                  style={{
                    background: `linear-gradient(165deg, #282c34, #24a2b7)`,
                    borderColor: props.theme === "dark" ? "white" : "",
                    color: "white"
                  }}
                >
                  <CardImg
                    top
                    src={member.img.replace("m.jpeg", "l.jpeg")}
                    alt={member.img_alt}
                  />
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                      {member.name}
                    </CardTitle>
                    <hr style={{ borderColor: "white" }} />
                    <CardSubtitle tag="h6" className="mb-2">
                      <div className="d-flex align-items-center py-1">
                        <BsPeopleFill className="mr-2" />
                        <span> {formatViews(live_info.viewers)}</span>
                      </div>
                      <div className="d-flex align-items-center py-1">
                        <BsCalendarDateFill className="mr-2" />
                        <span>{formatLongDate(live_info.date.start)}</span>
                        <span className="mx-1">-</span>
                        <span>{formatLongDate(live_info.date.end, true)}</span>
                      </div>
                      <div className="d-flex align-items-center py-1">
                        <FaClock className="mr-2" />
                        <span>{getLiveDuration(live_info.duration)}</span>
                      </div>
                      <div className="d-flex align-items-center py-1">
                        <AiFillGift className="mr-2" />
                        <span>{formatViews(log.points)} G</span>
                      </div>
                    </CardSubtitle>
                    <hr style={{ borderColor: "silver" }} />
                    <div className="text-start mt-3">
                      <CardText className="font-weight-bold">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <GiBackwardTime
                              color="silver"
                              size={22}
                              className="mr-1"
                            />
                            <TimeAgo
                              style={{ color: "ghostwhite" }}
                              date={live_info.date.start}
                            />
                          </div>
                          <div>Detail</div>
                        </div>
                      </CardText>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </MainLayout>
  );
};

export default LiveHistory;
