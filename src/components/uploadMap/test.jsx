const handleButtonClick = () => {
    if (!mapRef.current) return;


    const handleMapClick = (e) => {
        const { lng, lat } = e.lngLat;
        if (rangeMarkerRef.current) {
          rangeMarkerRef.current.setLngLat([lng, lat]);
        } 
        else {
          rangeMarkerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
        checkIsPointInGeofenceRange(lng, lat);
        mapRef.current.off("click", handleButtonClick);
      };

    mapRef.current.on("click", handleMapClick);
  };

  
  