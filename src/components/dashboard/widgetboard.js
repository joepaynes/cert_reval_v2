import React, { Component } from 'react';

class WidgetBoard extends Component {
    render() {
        return (
        <section className="widget-board">
            <div className="widget">
                <div className="widget__main-text">
                    56 Days
                </div>
                <div className="widget__sub-text">
                    To Next Expiry
                </div>
            </div>
            <div className="widget">
                <div className="widget__main-text">
                    130 Days
                </div>
                <div className="widget__sub-text">
                    Onboard Seabourn Quest
                </div>
            </div>
            <div className="widget">
                <div className="widget__main-text">
                    $3000
                </div>
                <div className="widget__sub-text">
                    For An Api?
                </div>
            </div>
            <div className="widget">
                <div className="widget__main-text">
                    56 Days
                </div>
                <div className="widget__sub-text">
                    To Next Expiry
                </div>
            </div>
            <div className="widget">
                <div className="widget__main-text">
                    130 Days
                </div>
                <div className="widget__sub-text">
                    Onboard Seabourn Quest
                </div>
            </div>
        </section>
        )
    }
}

export default WidgetBoard;