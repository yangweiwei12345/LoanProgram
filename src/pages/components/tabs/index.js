import React, { Component } from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  Image,
  TouchableOpacity,   // Pressable container
  View                // Container component
} from 'react-native';
import { Images, variable } from '../../../assets';
const { primary } = variable;

export default class Tabs extends Component {

  // Initialize State
  state = {
    // First tab is active by default
    activeTab: 0
  }

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {children.map(({ props: { title } }, index) => {
                const isActive = index === this.state.activeTab;
                const stylesObj = isActive ? [styles.tabText, styles.cr_23] : [styles.tabText];

                return (<TouchableOpacity
                    style={[
                        styles.tabContainer,
                        isActive ? styles.tabContainerActive : []
                    ]}
                    activeOpacity={1}
                    onPress={() => this.setState({ activeTab: index }) }
                    key={index}
                >
                    <Text style={stylesObj}>
                        {title}
                    </Text>
                    { isActive ? <Image style={styles.img} source={Images.wd_icon_gd} /> : <Text></Text> }
                </TouchableOpacity>)
            }
          )}
        </View>
        <View style={styles.contentContainer}>
          {children[this.state.activeTab]}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                            // Take up all available space
  },
  tabsContainer: {
    flexDirection: 'row',               // Arrange tabs in a row
  },
  tabContainer: {
    flex: 1,                            // Take up equal amount of space for each tab
    flexDirection: 'row',
    paddingVertical: 15,                // Vertical padding
    borderBottomWidth: 3,               // Add thick border at the bottom
    borderBottomColor: 'transparent',   // Transparent border for inactive tabs
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
      width: 9,
      height: 6,
      marginLeft: 4
  },
  tabContainerActive: {
    borderBottomColor: primary,       // White bottom border for active tabs
  },
  tabText: {
    color: '#666',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cr_23: {
    color: '#230E02'
  },
  contentContainer: {
    flex: 1                             // Take up all available space
  }
});