(function(r,i,h,u,n){"use strict";function p(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var y=p(h);let s;function I(){const t=i.findByProps("getFavoriteChannels"),_=i.findByProps("addFavoriteChannel"),c=i.findByDisplayName("Menu",!1);s=y.default.after("default",c,(l,o)=>{const[{navId:a}]=l;if(!(a=="channel-context"||a=="user-context"))return o;if(!u.findInReactTree(l[0].children,d=>d?.props?.id==="favorite-channel")){var e;if(document.querySelector("#"+a)){const f=u.getOwnerInstance(document.querySelector("#"+a));e=(f?._reactInternals||f?._reactInternalFiber)?.child.child.child.return?.memoizedProps.children.props.channel}if(!e||e.type===n.constants.ChannelTypes.GUILD_CATEGORY||e.type===n.constants.ChannelTypes.GUILD_DIRECTORY||e.type===n.constants.ChannelTypes.GUILD_STORE)return o;let d=t.isFavorite(e.id);const v=n.React.createElement(c.MenuItem,{id:"favorite-channel",label:`${d?"Unfavorite":"Favorite"} ${a=="channel-context"?"Channel":"DM"}`,action:()=>{_.toggleFavoriteChannel(e.id)}});l[0].children.splice(1,0,n.React.createElement(c.MenuGroup,{},v)),e.type===n.constants.ChannelTypes.GUILD_VOICE||e.type===n.constants.ChannelTypes.GUILD_STAGE_VOICE||l[0].children.splice(1,0,n.React.createElement(c.MenuSeparator))}return o})}function C(){s()}return r.onLoad=I,r.onUnload=C,Object.defineProperty(r,"__esModule",{value:!0}),r})({},cumcord.modules.webpack,cumcord.patcher,cumcord.utils,cumcord.modules.common);
