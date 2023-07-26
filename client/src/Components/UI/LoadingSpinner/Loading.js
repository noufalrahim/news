import "./Loading.css"
function Loading(){
    return(
        <div>
        <div className="lds-ripple">
        <div></div>
        <div></div>
        </div>
        <div className="loading-text">Loading News...</div>
        </div>
        
    )
}

export default Loading;