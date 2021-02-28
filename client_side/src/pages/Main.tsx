import { RouteComponentProps } from 'react-router-dom'
import GridContainer from 'components/common/GridContainer'
import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'
import { purple } from '@ant-design/colors'
import { Input } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

const StyledContainer = styled.div`
  padding: 0 3px;
  position: relative;
  top: 64px;
`

const imageURL = process.env.PUBLIC_URL + '/images/logo-background.jpg'

const FullImageElement = styled.div`
  width: 100%;
  height: 50%;
  object-fit: cover;
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: -2;
  background: url(${imageURL});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 40%;

  transition: transform 1s ease, opacity 1s ease;
`

const FullImage: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const loadStyle = useCallback<() => React.CSSProperties>(() => {
    return loaded
      ? {
          transform: 'scale(1)',
          opacity: 1
        }
      : {
          transform: 'scale(1.25)',
          opacity: 0.25
        }
  }, [loaded])

  return <FullImageElement style={{ ...loadStyle() }} />
}

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

const Contents = styled.div`
  margin-top: 20rem;
`

const Main: React.FC<RouteComponentProps> = ({ history }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [keyword, setKeyword] = useState('')
  const { lg } = useBreakpoint()

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
      <FullImage loaded={imageLoaded} />
      <StyledContainer>
        <GridContainer rowStyle={{ top: '0' }}>
          <StyledInner style={{ marginTop: lg ? '10rem' : '3rem' }}>
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
            <Contents>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              dignissim sodales tempus. Quisque tristique a tortor a
              scelerisque. Sed eget facilisis tellus. Aliquam eget diam a elit
              vulputate vestibulum nec in magna. Vestibulum a orci id arcu
              vehicula eleifend eu sit amet odio. Cras lobortis lacinia nibh, ut
              dictum libero semper in. Cras accumsan turpis ut urna sollicitudin
              dapibus. Nunc arcu turpis, gravida imperdiet felis in, molestie
              auctor eros. Maecenas faucibus elit convallis, fermentum nibh ac,
              ultrices ex. Nam tempus nulla ut tortor placerat, et consectetur
              erat finibus. Sed imperdiet ipsum sit amet rutrum ullamcorper.
              Aenean eu fermentum lectus. Aliquam tristique enim nec risus
              fringilla ullamcorper. Nunc vitae porta arcu, vitae hendrerit dui.
              Nam ut dui auctor, gravida tellus vel, ullamcorper diam. Morbi
              rutrum elit sed dolor euismod, nec laoreet odio aliquet. Quisque
              pharetra semper nibh. In aliquam accumsan bibendum. In hac
              habitasse platea dictumst. Fusce convallis, ex id bibendum
              efficitur, turpis dui feugiat justo, non imperdiet purus erat quis
              ante. Ut convallis faucibus lorem, eu ullamcorper massa rhoncus
              sed. Quisque blandit felis nec ante bibendum bibendum. Nulla vel
              luctus turpis. Fusce volutpat ultricies blandit. Morbi varius
              sagittis orci a mollis. Aliquam facilisis, urna in aliquet
              maximus, mi est posuere nulla, condimentum sodales metus massa sed
              sem. Aliquam id rutrum urna. In non ullamcorper ante. Phasellus
              sagittis, mi ac cursus scelerisque, lectus magna ullamcorper quam,
              in luctus mi quam pharetra lacus. Mauris euismod diam ut metus
              egestas, nec interdum lorem pretium. Nulla facilisis fermentum
              placerat. Quisque sagittis tincidunt sapien, non viverra ipsum
              sodales quis. Mauris fringilla facilisis nisl, ac cursus odio
              luctus vel. Curabitur non accumsan velit, ac rhoncus mauris.
              Integer a felis ultrices, rhoncus nisi ac, interdum lorem. Duis ut
              accumsan nisl. Sed non malesuada nisi. Mauris vitae lorem sed diam
              ultrices fringilla at at metus. Donec vitae suscipit tellus.
              Vivamus a sagittis magna, et tempus dui. Nulla nec fermentum
              neque. Pellentesque hendrerit lacus tellus, ut tincidunt nibh
              venenatis eu. Suspendisse sem ante, venenatis et mollis non,
              maximus sit amet tellus. Nunc elementum justo ut felis sodales
              convallis. Fusce venenatis tortor non nulla pulvinar, vitae
              suscipit metus laoreet. Mauris purus enim, blandit et laoreet
              bibendum, feugiat nec turpis. Morbi quis commodo augue, ut
              pellentesque nunc. Fusce ultricies nisl sit amet interdum
              fermentum. Quisque convallis nec lacus eget dapibus. Donec non leo
              dignissim dui mattis sollicitudin vitae eu massa. Nullam varius
              tempus elit vel egestas. Donec non lacus sed urna rhoncus varius
              quis ac ipsum. Fusce metus nisi, imperdiet pretium consectetur
              quis, euismod nec libero. Orci varius natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus. Integer
              pellentesque a nisl at imperdiet. Aenean enim risus, ullamcorper
              sed enim vitae, accumsan placerat dolor. Nulla consequat vulputate
              ante id pharetra. Ut quam tortor, vulputate eget porta ut, pretium
              vitae nisi. Ut at arcu nec felis cursus venenatis. Sed convallis
              pretium metus, eu fermentum arcu. Curabitur ultrices tellus
              mauris, ac accumsan sapien vestibulum non. Phasellus augue turpis,
              rutrum ut interdum a, eleifend sed orci. Quisque eget lacus ac
              purus viverra dapibus at quis risus. Praesent ac purus vel odio
              tempus dapibus. Sed vel nisl ultrices, elementum tellus eget,
              elementum tellus. Aliquam accumsan in nisi ac molestie. Integer
              sollicitudin lobortis posuere. Curabitur sit amet dolor sed mauris
              aliquet ullamcorper nec at massa. Integer at enim est. Praesent
              dolor nulla, placerat nec risus quis, viverra vulputate ante.
              Suspendisse porttitor augue sit amet dolor gravida dapibus. Ut
              rhoncus lectus eu tellus accumsan condimentum. Pellentesque sed
              sollicitudin quam. Nunc id lectus volutpat, consectetur elit et,
              gravida augue. Vestibulum eget purus ac sem consectetur euismod.
              Vivamus a eros ante. Praesent vestibulum justo commodo urna
              imperdiet, ut euismod justo cursus. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Nunc varius, dui at laoreet
              volutpat, ligula mi suscipit nisl, ut consectetur erat metus sit
              amet lacus. Suspendisse venenatis dapibus sodales. Nullam auctor,
              quam et rutrum cursus, velit ex luctus risus, eget interdum odio
              sem in quam. Nunc eu justo a sem pellentesque viverra eu a purus.
              Fusce sit amet mattis risus. Sed ut urna est. Pellentesque
              vehicula erat ut egestas fringilla. In interdum facilisis justo,
              ut laoreet orci vulputate quis. Donec et mattis arcu. Sed congue
              consectetur augue. Nunc libero eros, pretium sit amet molestie a,
              mattis facilisis elit. Proin tincidunt, justo vitae tristique
              vestibulum, lorem metus finibus lorem, ut porta sapien erat in
              nunc. Morbi consectetur facilisis faucibus. Sed odio odio, varius
              a sollicitudin et, ultricies et justo. Maecenas nec maximus risus.
              Etiam vel tristique neque. Pellentesque at tristique velit.
              Pellentesque sed enim facilisis, laoreet mauris ut, laoreet quam.
              In finibus semper justo, quis bibendum lorem congue non. Phasellus
              volutpat purus id dui convallis sodales. Etiam ipsum odio, euismod
              non ex fermentum, aliquam tristique est. Nam vel nulla id tortor
              gravida ornare id vestibulum diam. Nulla facilisi. Quisque et
              purus accumsan, congue elit at, pharetra enim. Mauris sagittis et
              orci quis tempor. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Nullam risus purus,
              vestibulum vitae tincidunt in, aliquet ut odio. Aliquam pulvinar
              sem vitae laoreet cursus. Nunc commodo feugiat turpis vel varius.
              Proin convallis vehicula nisi eu ultricies. Aliquam erat volutpat.
              Aliquam cursus tortor nunc, in sodales dolor molestie sit amet.
              Sed euismod fringilla congue. Cras aliquam nulla in tincidunt
              efficitur. Phasellus sed magna vulputate, aliquet leo sit amet,
              viverra nunc. Aliquam ut urna lorem. Sed lorem odio, blandit id
              sodales eget, sagittis nec arcu. Phasellus ac eros a enim ornare
              convallis. Aenean id iaculis sapien, vel egestas mauris. Nam
              suscipit scelerisque velit, in posuere ipsum pellentesque vel.
              Praesent viverra imperdiet urna quis imperdiet. Phasellus posuere
              lectus in justo auctor, at fringilla ipsum volutpat. Proin
              fringilla interdum enim, ut accumsan lacus tincidunt congue. Donec
              porta tortor ligula, id suscipit magna laoreet et. Etiam finibus
              faucibus imperdiet. Integer sit amet mauris volutpat, facilisis
              magna ac, aliquet tortor. Quisque sapien diam, ultricies rhoncus
              leo quis, viverra pulvinar magna. Ut vestibulum cursus nibh quis
              commodo. Aliquam magna odio, ultrices ac mi interdum, rhoncus
              molestie metus. Fusce aliquam gravida varius. Praesent blandit
              risus ut turpis finibus vulputate. Proin sagittis, dolor eget
              lobortis efficitur, sapien purus sollicitudin eros, sed blandit
              massa metus a tortor. Proin malesuada ex non orci mollis congue.
              Proin cursus, arcu vel bibendum tristique, risus neque porttitor
              justo, at feugiat massa massa at mauris. Donec ut posuere metus.
              Sed nec felis vel odio mattis ultricies id sed leo. Sed
              scelerisque urna ipsum, sed imperdiet ante bibendum in.
            </Contents>
          </StyledInner>
        </GridContainer>
      </StyledContainer>
    </>
  )
}

export default Main
