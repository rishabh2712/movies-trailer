import React, { useState , useRef} from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'

import { IMAGEAPI } from '../config'
import useOnScreen from '../utils/useOnScreen'

import { withStyles } from '@material-ui/core/styles'
import IconThumbUp from '@material-ui/icons/ThumbUp'
import IconPlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
    container: {
        position: 'relative',
        width: '100%',   
        opacity: 1,
        [theme.breakpoints.down('md')]: {
            height: 180,
        },

        [theme.breakpoints.down('sm')]: {
            height: 230,
        },

        [theme.breakpoints.down('xs')]: {
            height: 320,
        },
        
        // [theme.breakpoints.down('xs')]: {
        //     height: 300,
        // },
        //padding: 15px 10px 5px;
    },
    image: {
        maxWidth: '100%',
        borderStyle: 'none',

        '&$selected': {
            border: `2px solid ${theme.palette.primary.main}`
        },
        maxHeight: '100%',
        maxWidth: '100%',
        minHeight: 180
    },
    title: {
        textAlign: 'left',
        color: '#fff',
        fontWeight: 500,
        fontSize: 13,
        marginTop: 10
    },
    selected: {},
    release: {
        background: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '50%',
        height: 16,
        width: 16,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: 10,
        padding: 10,
        top: '4.5%',
        right: '6.5%',
        position: 'absolute'
    },
    ratings: {
        position: 'absolute',
        bottom: '4%',
        right: '4%',
    },
    imageContainer: {
        position: 'relative',
    },
    itemDetails: {
        width: '100%',
        height: '50%',
        background: '#fff'
    },
    layer: {
        background: 'rgb(211,211,211)',
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7) 35%, rgba(255, 255, 255, .1) 100%)',
        bottom: 0,
        left: 0,
        right: 0,
        top: '70%',
        position: 'absolute',
        opacity: '.4'
    },
    thumb: {
        display: 'flex',
        fontSize: 12,
        alignItems: 'center',
        color: '#fff',  
        '& > svg': {
            color: theme.palette.primary.main,
            marginRight: '5px',
            fontSize: '15px'
        }
    },
    votes: {
        fontSize: 10,
        color: '#fff',
        textAlign: 'right'
    },
    playButton: {
        position: 'absolute',
        top: '42%',
        right: '38%',
        '& > svg': {
            color: '#fff',
            fontSize: 40
        },
        cursor: 'pointer'
    }
})
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function MovieItem(props) {
    const ref = useRef()
    let { classes, data, onSelect, selectedData } = props
    let src = process.env.PUBLIC_URL + '/grey.gif'
    let thisdate = new Date(), givenDate = new Date(data['ShowDate']), element = null
    let isThisYear = thisdate.getFullYear() - givenDate.getFullYear() === 0
    const onScreen = useOnScreen(ref, '0px')
    return (
    <div className={classes.container} ref={e => element = e} id={data['EventCode']}>
        <div className={classes.imageContainer}>
            <div className={classes.release}>
                {
                    isThisYear ?
                        <React.Fragment>
                            <div>
                                {givenDate.getDate()}
                            </div>
                            <div>
                                {monthShort[givenDate.getMonth()]}
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <div>
                                {monthShort[givenDate.getMonth()]}
                            </div>
                            <div>
                                {givenDate.getFullYear()}
                            </div>
                        </React.Fragment>
                        
                }
            </div>
            <div className={classes.layer} />
            <div className={classes.ratings}>
                <div className={classes.thumb}>
                    <IconThumbUp />
                    {`${data['ratings']['wtsPerc']}%`}
                </div>
                <div className={classes.votes}>
                    {`${data['csCount']} votes`}
                </div>
            </div>
            <div className={classes.playButton}>
                <IconPlayCircleOutline onClick={() => onSelect(data, ReactDOM.findDOMNode(element))}/>
            </div>
            <img
                ref={ref}
                src={onScreen ? `${IMAGEAPI}/${data.EventCode}.jpg` : src}
                alt={data.EventImageCode}
                className={clsx(classes.image, {[classes.selected]: selectedData['EventCode'] === data['EventCode']})}
            />
        </div>
        <div className={classes.title}>
            {data['EventTitle']}
        </div>
    </div>
    )
}

export default withStyles(styles)(MovieItem)