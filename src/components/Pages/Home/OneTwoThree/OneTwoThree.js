
import React from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-flexbox-grid'

import classes from './OneTwoThree.scss'


@connect(
    ({ web3 }) => ({
        web3: web3
    })
)
export default class OneTwoThree extends React.Component {
    render() {
        return (
            <Grid fluid >
                <Row >
                    <Card style={{ width: '30%', margin: 'auto'}}>
               
                        <CardMedia
                            overlay={<CardTitle title='Overlay title' subtitle='Overlay subtitle' />}
                        >
                            <img src='https://source.unsplash.com/random/1280x1024' />
                        </CardMedia>
                     
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
                        <CardActions>
                            <FlatButton label='Action1' />
                            <FlatButton label='Action2' />
                        </CardActions>
                    </Card>
                    <Card style={{ width: '30%', margin: 'auto' }}>
              
                        <CardMedia
                            overlay={<CardTitle title='Overlay title' subtitle='Overlay subtitle' />}
                        >
                            <img src='https://source.unsplash.com/random/1280x1024' />
                        </CardMedia>
                     
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
                        <CardActions>
                            <FlatButton label='Action1' />
                            <FlatButton label='Action2' />
                        </CardActions>
                    </Card>

                    <Card style={{ width: '30%', margin: 'auto' }}>
                        <CardMedia
                            overlay={<CardTitle title='Overlay title' subtitle='Overlay subtitle' />}
                        >
                            <img src='https://source.unsplash.com/random/1280x1024' />
                        </CardMedia>
                     
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
                        <CardActions>
                            <FlatButton label='Action1' />
                            <FlatButton label='Action2' />
                        </CardActions>
                    </Card>
                </Row>
            </Grid>
        )
    }
}

