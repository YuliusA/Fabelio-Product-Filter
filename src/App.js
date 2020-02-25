import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { furnitureDataAction } from './helpers/redux/actions';
import Select from 'react-select'
import Header from './components/header';
import ProductList from './components/products/product-list';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import Loader from 'react-loader';

const optionsDelivery = [
    {
        label: '1 Week',
        value: 7
    },
    {
        label: '2 Weeks',
        value: 14
    },
    {
        label: '1 Month',
        value: 30
    },
    {
        label: 'More',
        value: 31
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            descCharlimit: 114,
            data: [],
            isLoading: true,
            furnitureOptionSelected: [],
            deliveryOptionSelected: []
        };
    }

    async componentDidMount() {
        const response = await fetch('https://www.mocky.io/v2/5c9105cb330000112b649af8');
        const json = await response.json();
        await this.props.furnitureDataAction(json);
        this.setState({
            data: json,
            isLoading: false
        });
    }

    handleChange = event => {
        this.setState({ search: event.target.value });
    };

    handleChangeFurniture = furnitureOptionSelected => {
        this.setState({ furnitureOptionSelected },
            () => console.log('furniture opt selected : ', this.state.furnitureOptionSelected)
        );
    };

    handleChangeDeliveryTime = deliveryOptionSelected => {
        this.setState({ deliveryOptionSelected },
            () => console.log('delivery opt selected : ', this.state.deliveryOptionSelected)
        );
    };

    displayDeliveryTime(arr, timeDelivery){
        let arra = [];
        for ( var i = 0; i < arr.length; i++ ) {
            if (arr[i].delivery_time <= timeDelivery) {
                arra.push(arr[i]);
            }
        }
        return arra;
    }

    displayFurnitureStyle(arr, style) {
        console.log("arra"+JSON.stringify(arr)+"..."+style);
        let arra = [];

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].furniture_style.includes(style)) {
                arra.push(arr[i]);
            }
        }
        return arra;
    }

    removeDuplicateArray(array, nameDuplicate) {
        let arr = [];
        let tempObj = {};

        for(let x in array) {
            tempObj[array[x][nameDuplicate]] = array[x];
        }
        for(let x in tempObj) {
            arr.push(tempObj[x]);
        }
        return arr;
    }

    render() {
        const { furnitureOptionSelected, deliveryOptionSelected } = this.state;

        let optionsFurniture = [];
        let dataFurniture = "";

        if (!this.state.isLoading) {
            for (let x = 0; x < this.state.data.furniture_styles.length; x++) {
                optionsFurniture[x]={};
                optionsFurniture[x].label = this.state.data.furniture_styles[x];
                optionsFurniture[x].value = x+1;
            }

            var dataProduct = this.state.data.products;

            dataFurniture = dataProduct.filter((data) => {
                if (this.state.search == null) {
                    return data
                } else if (data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                    return data
                }
            });

            let arrayTemp = [];
            if (deliveryOptionSelected.length > 0) {
                for(var x=0; x<deliveryOptionSelected.length; x++) {
                    arrayTemp = JSON.parse(JSON.stringify(this.displayDeliveryTime(dataFurniture, deliveryOptionSelected[x].value)));
                }
                dataFurniture = this.removeDuplicateArray(arrayTemp, "name");
            }

            if (furnitureOptionSelected.length > 0) {
                let storeData = [];
                for (var x = 0; x < furnitureOptionSelected.length; x++) {
                    arrayTemp = JSON.parse(JSON.stringify(this.displayFurnitureStyle(dataFurniture, furnitureOptionSelected[x].label)));
                    console.log("array tempa" + JSON.stringify(arrayTemp));
                    storeData = storeData.concat(arrayTemp);
                }
                console.log("array ==> " + JSON.stringify(storeData));
                dataFurniture = this.removeDuplicateArray(storeData, "name");
            }
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <Header/>

                {this.state.isLoading
                    ? (
                        <Loader loaded={false} lines={13} length={16} width={8} radius={24}
                                corners={1} rotate={0} direction={1} color="#444" speed={1}
                                trail={60} shadow={false} hwaccel={false} className="spinner"
                                zIndex={2e9} top="50%" left="50%" scale={1.00}
                                loadedClassName="loadedContent" />
                    )
                    : (
                        <main>
                            <Box className="form-filter-container" bgcolor="warning.main">
                                <Container maxWidth="lg">
                                    <form className="form-filter">
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={4}>
                                                <label>Search by product name</label>
                                                <TextField
                                                    id="inputName"
                                                    placeholder="Enter Keyword.."
                                                    onChange={this.handleChange}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={4}>
                                                <label>Product style</label>
                                                <Select
                                                    options={optionsFurniture}
                                                    onChange={this.handleChangeFurniture}
                                                    isMulti
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <label>Delivery Time</label>
                                                <Select
                                                    options={optionsDelivery}
                                                    onChange={this.handleChangeDeliveryTime}
                                                    isMulti
                                                />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Container>
                            </Box>

                            <Box className="product-list-container">
                                <ProductList data={dataFurniture} />
                            </Box>
                        </main>
                    )
                }
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    furnitureDataAction: (data) => dispatch(furnitureDataAction(data))
})

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
