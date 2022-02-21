import Bubble from "../../components/Bubble/Bubble";
import React, { useEffect, useMemo, useState } from "react";
import Calendar from "../../icons/Calendar";
import Ticket from "../../icons/Ticket";
import Location from "../../icons/Location";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import WelcomeImage from "../../assets/img/welcome-img.png";
import WelcomeImageMobile from "../../assets/img/welcome-img-mobile.png";
import "./Welcome.scss";
import Fade from "react-reveal/Fade";
import { StructuredText  } from "react-datocms";

const Overview = (props) => {
    return (
        <div className="overview">
            <OverviewItem>
                <Calendar />
                {props.date.toLocaleDateString("hu-HU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    weekday: "long",
                })}
            </OverviewItem>
            <OverviewItem>
                <Location />
                (Budapest) || (Online)
            </OverviewItem>
        </div>
    );
};

const OverviewItem = (props) => (
    <div className="overview-item">{props.children}</div>
);

const calculateCountdown = (target) => {
    const current = new Date();
    const diff = Math.max(Math.round((target - current) / 1000), 0); // seconds
    const days = Math.floor(diff / (24 * 60 * 60));
    const hours = Math.floor((diff - days * 24 * 60 * 60) / (60 * 60));
    const minutes = Math.floor(
        (diff - days * 24 * 60 * 60 - hours * 60 * 60) / 60
    );
    return { days, hours, minutes };
};

const Welcome = (props) => {
    const target = useMemo(() => new Date("2022-03-19 09:00:00"), []);
    const [countdown, setCountdown] = useState({});
	const {welcomeText} = props
    useEffect(() => {
        setCountdown(calculateCountdown(target));
        const interval = window.setInterval(() => {
            setCountdown(calculateCountdown(target));
        }, 1 * 1000);

        return () => window.clearInterval(interval);
    }, [target]);

    return (
        <Section container placeholder id="welcome">
            <div className="row">
                <div className="col-md-7 col-12">
                    <div className="bubbles">
                        <Fade left delay={200}>
                            <Bubble
                                title={countdown.days}
                                subtitle="nap"
                                corners={["bottom-left"]}
                            />
                        </Fade>
                        <Fade left delay={100}>
                            <Bubble title={countdown.hours} subtitle="óra" />
                        </Fade>
                        <Fade left delay={0}>
                            <Bubble
                                title={countdown.minutes}
                                subtitle="perc"
                                corners={["top-left"]}
                            />
                        </Fade>
                    </div>
                    <Fade top delay={300}>
                        <Overview date={target} />
                    </Fade>
                    <Fade left delay={350}>
                        <img
                            src={WelcomeImageMobile}
                            alt="IOK 2022"
                            className="welcome-image-mobile"
                        />
                    </Fade>
                    <Fade top delay={400}>
                        <h1>
                            Informatikai Oktatási Konferencia{" "}
                            <span className="highlight">2022</span>
                        </h1>
                    </Fade>
                    <Fade top delay={440}>
                        <StructuredText data={welcomeText} />
                    </Fade>
                    <div className="buttons">
						{/*<Fade top delay={480}>
                            <Button secondary bold>
                                További információ
                            </Button>
                        </Fade> */}
                        <Fade top delay={530}>
                            <Button href="#regisztracio" bold>
                                <Ticket />
                                Regisztráció
                            </Button>
                        </Fade>
                    </div>
                </div>
            </div>
            <Fade right duration={1300}>
                <img src={WelcomeImage} alt="" className="welcome-image" />
            </Fade>
        </Section>
    );
};

export default Welcome;
