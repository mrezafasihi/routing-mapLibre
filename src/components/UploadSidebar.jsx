import { apiKey } from "../constants";

function UploadSidebar() {
  const handleUpload = (e) => {
    console.log(e.target.files[0]);
  };
  const requestUploadGeojson=async()=>{
    const apiUrl="https://map.ir/geofence/stages"
    try{
const response=await fetch(apiUrl,{ method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey
  },
  body: JSON.stringify({
    key1: 'value1',
    key2: 'value2'
  })})
    }catch(error){
      alert(error.message);
      console.error("Error fetching route:", error.message);
    }
  }
  return (
    <div className="flex flex-col w-[30%] h-screen">
      <h4>the count of you upload:</h4>
      <input
        type="file"
        className="w-full text-white"
        onChange={handleUpload}
      />
    </div>
  );
}

export default UploadSidebar;
