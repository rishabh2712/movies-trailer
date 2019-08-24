import React from 'react'
import clsx from 'clsx'

import Grid from '@material-ui/core/Grid'
 
import MovieItem from './MovieItem'

import { withStyles } from '@material-ui/core/styles'

import IconThumbUp from '@material-ui/icons/ThumbUp'
import IconCalendar from '@material-ui/icons/CalendarToday'
import IconHelpOutline from '@material-ui/icons/HelpOutline'
import IconThumbDown from '@material-ui/icons/ThumbDown'
import { IMAGEAPI } from '../config'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    itemDetails: {
        width: '100%',
        height: 'calc(38vw - 75px)',
        minHeight: '350px',
        position: 'relative'
    },
    ytPlayer: {
        width: '60%',
        height: '100%',
        marginRight: '25px',
        top: 0,
        left: 0,
        position: 'absolute'
    },
    details: {
        top: 0,
        padding: '20px',    
        position: 'absolute',
        width: '35%',
        marginLeft: '25px',
        height: '100%',
        right: 0,
        color: "#fff",
        backgroundColor: 'rgba(0,0,0,0.3)',
        boxSizing: 'border-box'
    },
    itemContainer: {
        zIndex: 0,
        opacity: 0.3,
        filter: 'blur(25px)',
        height: '120%',
        width: '100%'
    },
    title: {
        fontSize: '16px',
        fontWeight: 'bolder',
        marginBottom: '7px'
    },
    subtitle: {
        textTransform: 'uppercase',
        fontSize: '13px',
        fontWeight: 'lighter'
    },
    chip: {
        display: 'inline-block',
    },
    meta: {
        display: 'flex',
        flexDirection: 'row',
        margin: '5px 15px 0px 0px'
    },
    metaData: {
        marginTop: '15px',
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    metaItem: {
        color: '#fff',
        marginLeft: '5px'
    },
    subMeta: {
        fontWeight: 'bold',
        fontSize: '11px'
    },
    detailsFooter: {
        width:'100%',
        position: 'absolute',
        bottom: '10px',
        left: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    subMetaLight: {
        fontWeight: 'lighter',
        fontSize: '11px'
    },
    footerItem: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 12,
        margin: '10px',
        flexDirection: 'column',
        '&$willWatch': {
            color: theme.palette.primary.main
        },
        '&$willMaybe': {
            color: '#EE8833'
        },
        '&$willDontWatch': {
            color: '#8B0000'
        }
    },
    icon: {
        marginBottom: 4,
    },
    willWatch: {},
    willMaybe: {},
    willDontWatch: {},
})
const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Datagrid = React.forwardRef((props, ref) => {
    let {
        list,
        onSelect,
        lastElofRow,
        classes,
        selectedData = {}
    } = props
    let trailer = selectedData && selectedData["TrailerURL"] || "", re = /(watch?v=)/
    let videoId = trailer.split('v=')[1] || ""
    var ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    let givenDate = new Date(selectedData['ShowDate'])
    let videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=true"&rel=0&modestbranding=1" +
    this.props.modest;`
    return (
        <Grid container justify="flex-start" spacing={6}>
            {
                list.map((item, idx) => 
                    <React.Fragment>
                        {lastElofRow != null && item['EventCode'] === lastElofRow &&
                            <div className={classes.itemDetails}>
                                <div className={classes.itemContainer} style={{
                                    backgroundImage: `url(${IMAGEAPI}/${selectedData.EventCode}.jpg)`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }} />
                                <div className={classes.ytPlayer}>
                                <iframe
                                        className="player"
                                        type="text/html"
                                        width="100%"
                                        height="100%"
                                        src={videoSrc}
                                        frameborder="0"
                                    />
                                </div>
                                <div className={classes.details}>
                                    <div className={classes.title}>
                                        {selectedData["EventTitle"]}
                                    </div>
                                    <div className={classes.subtitle}>
                                        {selectedData["EventLanguage"]}
                                    </div>
                                    <div className={classes.metaData}>
                                        <div className={classes.meta}>
                                            <IconThumbUp />
                                            <div className={classes.metaItem}>
                                                <div className={classes.subMeta}>
                                                    {`${selectedData['ratings']['wtsPerc']}%`}
                                                </div>
                                                <div className={classes.subMetaLight}>
                                                    {`${selectedData['csCount']} votes`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.meta}>
                                            <IconCalendar />
                                            <div className={classes.metaItem}>
                                                <div className={classes.subMeta}>
                                                    {`${givenDate.getDate()} ${monthShort[givenDate.getMonth()]}`}
                                                </div>
                                                <div className={classes.subMetaLight}>
                                                    {givenDate.getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className={classes.detailsFooter}>
                                    <div className={clsx(classes.footerItem, classes.willWatch)}>
                                        <IconThumbUp fontSize='large' className={classes.icon}/>
                                        <div style={{ marginBottom: '5px', fontSize: 10}}> 
                                           WILL WATCH
                                        </div>
                                        <div style={{ marginBottom: '7px', fontSize: 10}}>
                                            ({selectedData['wtsCount']})
                                        </div>
                                    </div>
                                    <div className={clsx(classes.footerItem, classes.willMaybe)}>
                                        <IconHelpOutline fontSize="large" className={classes.icon}/>
                                        <div style={{ marginBottom: '5px', fontSize: 10}}> 
                                           MAYBE
                                        </div>
                                        <div style={{ marginBottom: '7px', fontSize: 10}}>
                                            ({selectedData['maybe']})
                                        </div>
                                    </div>
                                    <div className={clsx(classes.footerItem, classes.willDontWatch)}>
                                        <IconThumbDown fontSize="large" className={classes.icon}/>
                                        <div style={{ marginBottom: '5px', fontSize: 10}}> 
                                            WONT WATCH
                                        </div>
                                        <div style={{ marginBottom: '7px', fontSize: 10}}>
                                            ({selectedData['dwtsCount']})
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>   
                        }
                        <Grid item xs={6} sm={3} md={2} key={idx}>
                            <MovieItem
                                data={item}
                                onSelect={onSelect}
                                selectedData={selectedData}
                            />
                        </Grid>
                    </React.Fragment>
                   
                )
            }
        </Grid>
    )
})

export default withStyles(styles)(Datagrid)