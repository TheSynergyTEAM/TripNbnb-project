import React from 'react'

const PlaceDataHandler = React.createContext({
  updateCallback(reviewData: any) {}
})

const PlaceDataProvider: React.FC<any> = ({ updateCallback, children }) => {
  return (
    <PlaceDataHandler.Provider value={{ updateCallback }}>
      {children}
    </PlaceDataHandler.Provider>
  )
}

export { PlaceDataProvider }

export default PlaceDataHandler
