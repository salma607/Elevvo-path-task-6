import Sidebar from "../../Component/Sidebar/Sidebar"
import Cards from "../../Component/Cards/Cards"
import Recent from "../../Component/Recent Activities/Recent"

export default function Home(){
    return(
        <div>
            <Sidebar/>
            <Cards/>
            <Recent/>
        </div>
    )
}