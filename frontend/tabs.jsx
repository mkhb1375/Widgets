import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Tabs() {
    const [selected, setSelected] = useState(0);
    const [contents, setContents] = useState({ 1: "", 2: "", 3: "" });

    const tabList = ["first", "second", "third"];

    useEffect(() => {
      
        const savedSelectedTab = Cookies.get("selectedTab");
        const savedContents = Cookies.get("tabContents");

        if (savedSelectedTab !== undefined) {
            setSelected(parseInt(savedSelectedTab));
        }

        if (savedContents !== undefined) {
            setContents(JSON.parse(savedContents));
        }
    }, []);

    useEffect(() => {
       
        Cookies.set("selectedTab", selected.toString());
        Cookies.set("tabContents", JSON.stringify(contents));
    }, [selected, contents]);

    function changeTab(idx) {
        setSelected(idx);
    }

    function changeContent(e) {
        setContents((prevContents) => ({
            ...prevContents,
            [selected]: e.target.value,
        }));
    }

    return (
        <div className="col h4 bg-secondary text-white container p-3 m-3 rounded  ">
            <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
                {tabList.map((tab, idx) => (
                    <li
                        className={`text-center col nav-link ${selected === idx ? "active text-black" : ""
                            }`}
                        onClick={() => changeTab(idx)}
                        key={tab}
                        style={{
                            cursor: "pointer",
                            color: "white",
                        }}
                    >
                        {tab}
                    </li>
                ))}
            </ul>

            <textarea
                style={{ minHeight:"100px" ,border:"2px solid white", background: "transparent", width: "100%" }}
                className="form-control fs-5 text-white"
                value={contents[selected]}
                placeholder="Your notes ..."
                onChange={changeContent}
            ></textarea>
        </div>
    );
}
