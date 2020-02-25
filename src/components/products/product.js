import * as React from 'react';
import './styles.css';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import StarRateOutlinedIcon from '@material-ui/icons/StarRateOutlined';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';

class Product extends React.Component {
    render() {
        return (
            <Grid item xs={12} md={6}>
                <Card className="product-item">
                    <Grid container spacing={0}>
                        <Grid item xs={12} md={4}>
                            <CardMedia image="/img/dummy.jpg" title={this.props.product.name}/>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <CardContent>
                                <Typography component="h6" variant="h6">
                                    {this.props.product.name}
                                </Typography>

                                <div className="product-styles-wrapper">
                                    {this.props.product.furniture_style.map(style => (
                                        <Chip className="product-style" label={style} icon={<StarRateOutlinedIcon/>} clickable size = "small" variant="outlined"/>
                                    ))}
                                </div>

                                <Typography paragraph={true} variant="body2">
                                    {this.props.product.description.substr(0,114)}....
                                </Typography>

                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={6}>
                                        <Typography className="product-price" component="h6" variant="h6">
                                            <small>IDR</small> {this.props.product.price.toLocaleString()}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box className="shipping-time" textAlign="right">
                                            <LocalShippingRoundedIcon color="disabled" />
                                            <span className="duration">{this.props.product.delivery_time} Day(s)</span>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        );
    }
}

export default Product;