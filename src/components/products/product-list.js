import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Product from './product';

class ProductList extends React.Component {
    render() {
        const { data } = this.props;

        return (
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                {data !== undefined
                    ? data.map((product, index) =>
                        <Product number={index} key={index} product={product} />
                    ) : <div>Error</div>
                }
                </Grid>
            </Container>
        );
    }

}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps)(ProductList);