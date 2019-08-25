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
import FormControlLabel from '@material-ui/core/FormControlLabel';  
import Chip from '@material-ui/core/Chip';

/**MUI ICons */
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IconClear from '@material-ui/icons/Clear'

/** Custom components*/
import Datagrid from './Datagrid'

import data from '../data.json'



const HEADER = 65
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP + 100,
        width: 200,
        padding: 10,
        background: 'rgba(0, 0, 0, 0.8)'
    },  
  },
};

const styles = theme => ({
    title: {
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
    },
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
        display: 'flex',
        alignItems: 'center',
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
        '-webkit-align-items': 'baseline',
        '-moz-align-items': 'baseline',
        '-ms-align-items': 'baseline',
        'align-items': 'baseline',
        'padding': '0px 18px',
    },
    topWidget: {
        display: 'flex',
        flexDirection: 'row',
        width: '50%'
    },
    datagrid: {
        paddingTop: HEADER,
        margin: 20,
    },
    listContainer: {
        margin: '20px'
    },
    widgetButton: {
        margin: '0px 10px',
        flexWrap: 'nowrap',
        fontWeight: 'bold',
        textOverflow: 'elipsis',
        fontSize: '0.567rem',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
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
        margin: '0px 15px',
        '& > label': {
            fontSize: 12
        }
    },
    customFilters: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        minHeight: 30,
        alignItems: 'center'
    },
    chip: {
        margin: theme.spacing(0.5),
        color: '#8a8a8a',
        padding: 8,
        fontSize: '10px'
    },
    filter: {
        fontSize: 12,
        color: '#8a8a8a',
        marginRight: '1.5em'
    },
    optionLabel: {
        fontSize: 11,
        marginLeft: -20
    },
    selected: {
        color: theme.palette.primary.main
    },
    checkboxRoot: {
        padding: '2px 10px'
    },
    input: {
        fontsize: 10
    }
})

class AppContainer extends React.Component {
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
            },
            lastElofRow: null
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

    handleDelete = (filterType, chip) => event => {
        this.setState(state => ({
            filters: {
                    ...state.filters    ,
                    [filterType]: state.filters[filterType].filter(item => item!=chip)
                }
            }) 
        )
    }
    getLastElofRow = (el, data) => {
        /**Last element */
        if(el.nextElementSibling === null || el.previousElementSibling === null) {
            this.setState(state => ({
                lastElofRow: el.children[0].id,
                selectedData: data
            })
            )
            return 
        }
        if (el.previousElementSibling.offsetTop != el.offsetTop) {
            if (el.previousSibling.children.length) {
                    this.setState(state => ({
                        lastElofRow: el.children[0].id,
                        selectedData: data
                    }), () => {
                        el.previousSibling.scrollIntoView({ inline: 'center' })
                    }
                )
            }   
        } else {
            this.getLastElofRow(el.previousElementSibling, data)
        }
    }


    onSelect = (data, ref) => {
        let element = ref.parentElement
        this.getLastElofRow(element, data)
    }

    render() {
        let {
            classes
        } = this.props
        let {
            filters: { fGenres, fLanguages },
            data: { language, movies, genres }
        } = this.state

        let getFilteredData = () => {
            let masterFilter = []
            let fg = {}, fl = {}
            fGenres.map(item => fg[item] = {})
            fLanguages.map(item => fl[item] = {})
            if(fLanguages.length) masterFilter.push([fl, "EventLanguage"])
            if (fGenres.length) masterFilter.push([fg, "EventGenre"])
            return masterFilter.reduce((acc, mf) => {
                return acc.filter(item => {
                    return item[mf[1]] in mf[0]
                })
            }, Object.values(movies))
        }

        return (
            <div className={ classes.wrapper }>
                <header className={classes.header}>
                    <div className={classes.navContainer}>
                        <div className={clsx(classes.topWidget, classes.left)}>  
                            <div className={classes.title}>
                                Movie Trailers
                            </div>
                            <Button variant="contained" color="primary" style={{color: '#fff'}} className={classes.widgetButton}>Coming Soon</Button>
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
                                        <div key={name} value={name}>
                                           <FormControlLabel
                                              control={
                                                <Checkbox
                                                    classes={{
                                                        root: classes.checkboxRoot        
                                                    }}          
                                                  checked={fLanguages.indexOf(name) > -1}        
                                                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                      checkedIcon={
                                                          <CheckBoxIcon
                                                              color="primary"
                                                              fontSize="small"
                                                          />}
                                                  value="checkedI"
                                                />
                                              }
                                          />
                                          <span className={clsx(classes.optionLabel, {
                                              [classes.selected]: fLanguages.indexOf(name) > -1
                                          })}>{name}</span>
                                      </div>
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
                                    input={<Input id="select-multiple-checkbox" classes={{ root: classes.input }}/>}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {genres.map(name => (
                                        <div key={name} value={name}>
                                             <FormControlLabel
                                                control={
                                                    <Checkbox
                                                    classes={{
                                                        root: classes.checkboxRoot        
                                                    }} 
                                                    checked={fGenres.indexOf(name) > -1}        
                                                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                        checkedIcon={
                                                            <CheckBoxIcon
                                                                color="primary"
                                                                fontSize="small"
                                                            />}
                                                    value="checkedI"
                                                />
                                                }
                                            />
                                            <span className={clsx(classes.optionLabel, {
                                                [classes.selected]: fGenres.indexOf(name) > -1
                                            })}>{name}</span>
                                        </div>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </header>
                <div className={classes.datagrid}>
                    <div className={classes.customFilters}>
                        {
                            (fLanguages.length || fGenres.length) ? 
                                <div className={classes.filter}>
                                    Applied Filters: 
                                </div>
                                : null
                        }
                        {
                            fLanguages.map((chip, index) => 
                            <Chip
                                size="small"
                                key={index}
                                label={chip}
                                    deleteIcon={<IconClear style={{color: '#8a8a8a', fontSize: '18px', marginLeft: '2px'}}/>}
                                onDelete={this.handleDelete("fLanguages", chip)}
                                className={classes.chip}
                                color="secondary"
                                />
                            )    
                        }
                        {
                            fGenres.map((chip, index) => 
                            <Chip
                                size="small"
                                key={index}
                                label={chip}
                                deleteIcon={<IconClear style={{color: '#8a8a8a', fontSize: '20px', marginLeft: '5px'}}/>}
                                onDelete={this.handleDelete("fGenres", chip)}
                                className={classes.chip}
                                color="secondary"
                                />
                            )    
                        }
                    </div>
                    <div className={classes.listContainer}>
                        <Datagrid
                            list={getFilteredData()}
                            onSelect={this.onSelect}
                            selectedData = {this.state.selectedData}
                            lastElofRow={this.state.lastElofRow}
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles)(AppContainer)
