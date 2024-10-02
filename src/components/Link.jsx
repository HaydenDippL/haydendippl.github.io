function Link(props) {
    if (props.link)
        return <a href={props.link} target='_blank' style={{margin: '10px'}}>
            <div className='link' style={{
                height: props.size,
                width: props.size,
                borderRadius: props.size * 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#c151e5'
            }}>
                <img style={{filter: 'invert(100%)'}} height={props.size * 0.95} width={props.size * 0.95} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_437102.png&f=1&nofb=1&ipt=021b3831a106b19d4f6cd0875452042b21b80bd644140418553c8c0f71e8a01a&ipo=images'/>
            </div>
        </a>
    else
        return <a onClick={() => alert(props.message)} style={{margin: '10px'}}>
            <div className='link' style={{
                height: props.size,
                width: props.size,
                borderRadius: props.size * 0.2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'gray'
            }}>
                <img style={{filter: 'invert(100%)'}} height={props.size * 0.95} width={props.size * 0.95} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_437102.png&f=1&nofb=1&ipt=021b3831a106b19d4f6cd0875452042b21b80bd644140418553c8c0f71e8a01a&ipo=images'/>
            </div>
        </a>
}

export default Link