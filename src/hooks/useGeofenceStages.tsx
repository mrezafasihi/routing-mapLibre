import React from 'react'
import useSWR from 'swr'

const useGeofenceStages=()=> {
    const {data:stages,isLoading:isStagesLoading,mutate:mutateStages,isValidating:isStageValidating}=useSWR(`https://map.ir/geofence/stages`)

  return {stages,isStagesLoading,mutateStages,isStageValidating}
}

export default useGeofenceStages