import React from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {ILayoutProps} from "@/interfaces/ILayout";




const Dashboard :React.FC<ILayoutProps> = ({children})=>{
    return (
        <div className="grid grid-cols-12">
            <Header/>
            <Sidebar/>
            <div className="col-span-10 bg-gray-100 p-4 min-h-screen">{children}</div>
        </div>
    );
};


export default Dashboard;