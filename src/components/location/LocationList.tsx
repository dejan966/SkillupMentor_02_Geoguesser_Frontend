import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import { FC } from 'react'
import { Button } from 'react-bootstrap'
import LocationBlock from './LocationBlock'
import { LocationType } from 'models/location'

interface Props {
  title: string
  desc: string
  status: string
  locationData?: any
  guessData?: any
  pageNumber?: number
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>
}

const LocationList: FC<Props> = (props: Props) => {
  const { title,
    desc,
    status,
    locationData,
    guessData,
    pageNumber,
    setPageNumber,} = props
  return (
    <>
      <h3 className="green">{title}</h3>
      <p>{desc}</p>
      {status === 'error' && <p>Error fetching data</p>}
      {status === 'loading' ? (
        <p>Loading data...</p>
      ) : (
        <>
          {locationData &&
          status === 'success' ? (
            <>
              <div className="locationRow">
                {locationData?.data.data.map(
                  (item: LocationType, index: number) => (
                    <LocationBlock location={item} key={index} />
                  ),
                )}
              </div>
              {setPageNumber && locationData.data.meta.last_page > 1 && (
                <div className="d-flex justify-content-between">
                  <Button
                    className="btnRegister me-2"
                    onClick={() => setPageNumber((prev) => prev - 1)}
                    disabled={pageNumber === 1}
                  >
                    Prev page
                  </Button>
                  <Button
                    className="btnRegister"
                    onClick={() => setPageNumber((prev) => prev + 1)}
                    disabled={pageNumber === locationData.data.meta.last_page}
                  >
                    Next page
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {guessData.status != 401 && (
                <>
                  <div className="locationRow">
                    {guessData && guessData?.data.data.map(
                      (item: GuessType, index: number) => (
                        <LocationBlock locationGuess={item} key={index} />
                      ),
                    )}
                  </div>
                  {setPageNumber && guessData.data.meta.last_page > 1 && (
                    <div className="d-flex justify-content-between">
                      <Button
                        className="btnRegister me-2"
                        onClick={() => setPageNumber((prev) => prev - 1)}
                        disabled={pageNumber === 1}
                      >
                        Prev page
                      </Button>
                      <Button
                        className="btnRegister"
                        onClick={() => setPageNumber((prev) => prev + 1)}
                        disabled={pageNumber === guessData.data.meta.last_page}
                      >
                        Next page
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default LocationList
