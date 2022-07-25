import { findByProps, findByDisplayName } from "@cumcord/modules/webpack"
import patcher from "@cumcord/patcher"
import { findInReactTree, getOwnerInstance } from "@cumcord/utils"
import { React, constants } from "@cumcord/modules/common"
let unpatch

export function onLoad() {
	const GetFavoriteChannels = findByProps("getFavoriteChannels")
  const SetFavoriteChannels = findByProps("addFavoriteChannel")
  const Menu = findByDisplayName("Menu", false)

	unpatch = patcher.after("default", Menu, (args, res) => {
		const [ { navId } ] = args

		if (!(navId == 'channel-context' || navId == 'user-context'))
			return res

		const itemAlreadyInjected = findInReactTree(args[0].children, child => child?.props?.id === 'favorite-channel')

		if (!itemAlreadyInjected) {
			var channel

			if (document.querySelector('#' + navId)) {
				const instance = getOwnerInstance(document.querySelector('#' + navId))
				channel = (instance?._reactInternals || instance?._reactInternalFiber)?.child.child.child.return?.memoizedProps.children.props.channel
			}

			if (!channel)
				return res

			if (channel.type === constants.ChannelTypes.GUILD_CATEGORY || channel.type === constants.ChannelTypes.GUILD_DIRECTORY || channel.type === constants.ChannelTypes.GUILD_STORE)
        return res

			let isFavorite = GetFavoriteChannels.isFavorite(channel.id)

			const FavoriteMenuItem = React.createElement(Menu.MenuItem, {
        id: 'favorite-channel',
        label: `${isFavorite ? 'Unfavorite' : 'Favorite'} ${navId == 'channel-context' ? 'Channel' : 'DM'}`,
        action: () => {
          SetFavoriteChannels.toggleFavoriteChannel(channel.id)
        }
      })
			
      args[0].children.splice(1, 0, React.createElement(Menu.MenuGroup, {}, FavoriteMenuItem))
			
      if (!(channel.type === constants.ChannelTypes.GUILD_VOICE || channel.type === constants.ChannelTypes.GUILD_STAGE_VOICE))
        args[0].children.splice(1, 0, React.createElement(Menu.MenuSeparator))
		}

		return res
	})
}

export function onUnload() {
	unpatch()
}
