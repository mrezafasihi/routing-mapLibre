import React from 'react'
import useSWR from 'swr'
import { IStagePolygonResponse } from '../utils/types'

const useGeofenceStages=()=> {
    const {data:stages,isLoading:isStagesLoading,mutate:mutateStages,isValidating:isStageValidating}=useSWR<IStagePolygonResponse>(`https://map.ir/geofence/stages`)

  return {stages,isStagesLoading,mutateStages,isStageValidating}
}

export default useGeofenceStages