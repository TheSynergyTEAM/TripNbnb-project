import { RouteComponentProps } from 'react-router-dom'
import GridContainer from 'components/common/GridContainer'
import styled from 'styled-components'
import { useCallback, useEffect, useState, lazy } from 'react'
import { purple } from '@ant-design/colors'
import { Input } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

const Contents = lazy(() => import('components/landing/Contents'))

const imageURL = process.env.PUBLIC_URL + '/images/logo-background.jpg'

const StyledContainer = styled.div`
  padding: 0 3px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  display: block;
  background: url(${imageURL});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 40%;
  transition: transform 1s ease, opacity 1s ease;
`

const StyledInner = styled.div`
  text-align: center;
`

const StyledInnerTitle = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: ${purple[4]};
`

const StyledInput = styled(Input)`
  margin-top: 1rem;
`

const Main: React.FC<RouteComponentProps> = ({ history }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { lg } = useBreakpoint()

  const loadStyle = useCallback<() => React.CSSProperties>(() => {
    return imageLoaded
      ? {
          transform: 'scale(1)',
          opacity: 1
        }
      : {
          transform: 'scale(1.25)',
          opacity: 0.25
        }
  }, [imageLoaded])

  useEffect(() => {
    const image = new Image()

    image.src = imageURL
    image.onload = () => setImageLoaded(true)
  }, [])

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      history.push(`/search?keyword=${keyword}`)
    }
  }

  return (
    <>
      {/* <FullImage loaded={imageLoaded} /> */}
      <StyledContainer style={{ ...loadStyle() }}>
        <GridContainer rowStyle={{ top: '0', zIndex: 5 }}>
          <StyledInner style={{ margin: lg ? '15rem 0' : '8rem 0' }}>
            <StyledInnerTitle>Where to go</StyledInnerTitle>
            <StyledInput
              value={keyword}
              onKeyDown={handleEnter}
              onChange={(e) => setKeyword(e.target.value)}
              prefix={<SearchOutlined />}
              className="shadow-box"
              style={{
                maxWidth: '300px',
                textAlign: 'left',
                borderRadius: '20px',
                padding: '10px 20px',
                border: 'none'
              }}
              size="large"
              placeholder="Keyword"
              allowClear
            />
          </StyledInner>
        </GridContainer>
      </StyledContainer>
      <Contents />
    </>
  )
}

export default Main
