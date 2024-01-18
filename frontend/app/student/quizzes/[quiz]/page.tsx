"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import Assessment from "@/components/assessments/attempt";

export default function Quiz({params}) {

    return (
        <Dashboard>
            {/*{JSON.stringify(params)} {params.quiz}*/}
            <Assessment/>
        </Dashboard>
    );
}