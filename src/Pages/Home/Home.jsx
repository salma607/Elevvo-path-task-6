import Sidebar from "../../Component/Sidebar/Sidebar"
import Cards from "../../Component/Cards/Cards"
import Analysis from "../Analysis/Analysis"



export default function Home(){
    return(
        <div>
            <Sidebar/>
            <Cards/>
              <div className="m-2">
                <Analysis/>
          
        

            </div>
        </div>
    )
}