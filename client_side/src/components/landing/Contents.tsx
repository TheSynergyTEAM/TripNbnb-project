import GridContainer from 'components/common/GridContainer'
import { Row } from 'antd'
import FlexItem, { FlexItemTitle } from 'components/landing/FlexItem'
import styled from 'styled-components'

const StyledImage = styled.img`
  /* width: 100%;
  height: 100%; */
  object-fit: contain;
`

const FlexRow: React.FC = ({ children }) => (
  <Row
    align="middle"
    justify="center"
    gutter={100}
    style={{ marginBottom: '20rem' }}
  >
    {children}
  </Row>
)

const Contents: React.FC = () => {
  return (
    <GridContainer>
      <FlexRow>
        <FlexItem>
          <FlexItemTitle>여행</FlexItemTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
            eleifend magna. Nunc interdum posuere neque, sed dictum magna
            vehicula a. Duis ac suscipit diam. Pellentesque massa mi, lacinia in
            est vitae, pulvinar mattis eros. Etiam nibh libero, laoreet vitae
            pulvinar in, fringilla fermentum leo. Proin nibh arcu, viverra eget
            nisi eu, dignissim ultricies quam. Ut in volutpat neque, eu sagittis
            risus. Integer lacinia placerat tristique. Vestibulum lobortis
            fermentum est ac hendrerit. Duis eu diam feugiat, semper ante id,
            molestie lacus.
          </p>
        </FlexItem>
        <FlexItem>
          <StyledImage src="https://picsum.photos/id/301/600/300" alt="" />
        </FlexItem>
      </FlexRow>
      <FlexRow>
        <FlexItem>
          <FlexItemTitle>숙박</FlexItemTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
            eleifend magna. Nunc interdum posuere neque, sed dictum magna
            vehicula a. Duis ac suscipit diam. Pellentesque massa mi, lacinia in
            est vitae, pulvinar mattis eros. Etiam nibh libero, laoreet vitae
            pulvinar in, fringilla fermentum leo. Proin nibh arcu, viverra eget
            nisi eu, dignissim ultricies quam. Ut in volutpat neque, eu sagittis
            risus. Integer lacinia placerat tristique. Vestibulum lobortis
            fermentum est ac hendrerit. Duis eu diam feugiat, semper ante id,
            molestie lacus.
          </p>
        </FlexItem>
        <FlexItem>
          <StyledImage src="https://picsum.photos/id/302/600/300" alt="" />
        </FlexItem>
      </FlexRow>
      <FlexRow>
        <FlexItem>
          <FlexItemTitle>예약</FlexItemTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id
            eleifend magna. Nunc interdum posuere neque, sed dictum magna
            vehicula a. Duis ac suscipit diam. Pellentesque massa mi, lacinia in
            est vitae, pulvinar mattis eros. Etiam nibh libero, laoreet vitae
            pulvinar in, fringilla fermentum leo. Proin nibh arcu, viverra eget
            nisi eu, dignissim ultricies quam. Ut in volutpat neque, eu sagittis
            risus. Integer lacinia placerat tristique. Vestibulum lobortis
            fermentum est ac hendrerit. Duis eu diam feugiat, semper ante id,
            molestie lacus.
          </p>
        </FlexItem>
        <FlexItem>
          <StyledImage src="https://picsum.photos/id/304/600/300" alt="" />
        </FlexItem>
      </FlexRow>
    </GridContainer>
  )
}

export default Contents
