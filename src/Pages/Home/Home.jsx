import Sidebar from "../../Component/Sidebar/Sidebar"
import Cards from "../../Component/Cards/Cards"
import Recent from "../../Component/Recent Activities/Recent"
import Analysis from "../Analysis/Analysis"

export default function Home(){
    return(
        <div>
            <Sidebar/>
            <Cards/>
              <div className="flex flex-col lg:flex-row m-10 gap-6">
            <Recent/>
            <Analysis/>
            </div>
        </div>
    )
}