import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

/**Material ui components */
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

/** Custom components*/
import Datagrid from './Datagrid'

import data from '../data.json'



const HEADER = 72
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = theme => ({
    wrapper: {
        background: theme.palette.background.default,
        color: theme.palette.text.default,
        minHeight: '100%'
    },
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        margin: 0,
        padding: 0,
        height: HEADER,
        background: '#000',
        color: theme.palette.background.default,
    },
    navContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        display: '-webkit-box',
        display: '-moz-box',
        display: '-ms-flexbox',
        display: '-webkit-flex',
        display: 'flex',
        '-webkit-align-items': 'center',
        '-moz-align-items': 'center',
        '-ms-align-items': 'center',
        'align-items': 'center',
        'padding': '16px 48px',
    },
    topWidget: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%'
    },
    datagrid: {
        paddingTop: HEADER
    },
    widgetButton: {
        margin: '0px 15px',
        //color: '#fff',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',   
        color: theme.palette.text.secondary
    },
    right: {
        justifyContent: 'flex-end'
    },
    left: {
        justifyContent: 'flex-start'
    },
    selectRoot: {
        width: '100px',
        fontSize: 12,
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    formControl: {
        margin: '0px 15px'
    }
})

class AppContainer extends React.PureComponent {
    constructor(props) {
        super()
        this.state = {
            isLoading: false,
            data: {
                language: [], movies: {}, genres: []
            },
            error: false,
            filters: {
                fGenres: [], fLanguages: []
            }
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        }, () => {
            new Promise((resolve, reject) => {
                return resolve(data)   
            })
            .then(([language = [], movies = {}]) => {
                this.setState({
                    data: {
                        language, movies,
                        /**Since genres are not provided in api */
                        genres: [...new Set(Object.values(movies).map(item => item["EventGenre"]))]
                    },
                    isLoading: false
                })    
            })
        })
    }

    handleChange = event => {
        this.setState(state => ({
            filters: {
                    ...state.filters,
                    [event.target.name]: event.target.value
                }
            }) 
        )
    }

    render() {
        let {
            classes
        } = this.props
        let {
            filters: { fGenres, fLanguages },
            data: { language, movies, genres }
        } = this.state
        return (
            <div className={ classes.wrapper }>
                <header className={classes.header}>
                    <div className={classes.navContainer}>
                        <div className={clsx(classes.topWidget, classes.left)}>  
                            <div className={classes.title}>
                                Movie Trailers
                            </div>
                            <Button variant="contained" color="primary" className={classes.widgetButton}>Coming Soon</Button>
                            <Button variant="contained" color="secondary" className={classes.widgetButton}>Now Showing</Button>
                        </div>
                        <div className={clsx(classes.topWidget, classes.right)}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Language</InputLabel>
                                <Select
                                    multiple
                                    classes={{
                                        root: classes.selectRoot   
                                    }}
                                    name="fLanguages"    
                                    value={fLanguages}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {language.map(name => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={fLanguages.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                <Select
                                    multiple
                                    classes={{
                                        root: classes.selectRoot   
                                    }}
                                    name="fGenres"    
                                    value={fGenres}
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {genres.map(name => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={fGenres.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </header>
                <div className={classes.datagrid}>
                    <Datagrid

                    />
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(AppContainer)
