import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import FullMenu from "../assets/menuImg.svg";
import cafe from "../assets/coffee.png";

const { width, height } = Dimensions.get("window");
const MenuItem = ({ imageSource, foodName, foodDescription, price }) => (
  <View style={styles.componentSubMenu}>
    <View style={styles.menuImage}>
      <Image source={imageSource} style={{ height: "100%", width: "100%" }} />
    </View>
    <View style={styles.contentImage}>
      <View style={styles.contentImageLeft}>
        <Text style={styles.foodName}>{foodName}</Text>
        <Text style={styles.foodDescription}>{foodDescription}</Text>
      </View>
      <View style={styles.contentImageRight}>
        <Text style={{ color: "#5A3D41", fontWeight: "bold" }}>{price}</Text>
      </View>
    </View>
  </View>
);

function MenuRecommendScreen() {
  const menuItems = [
    {
      imageSource: cafe,
      foodName: "Food Name",
      foodDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      price: "500 000 đ",
    },
    {
      imageSource: cafe,
      foodName: "Food Name",
      foodDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      price: "500 000 đ",
    },
    {
      imageSource: cafe,
      foodName: "Food Name",
      foodDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      price: "500 000 đ",
    },
    {
      imageSource: cafe,
      foodName: "Food Name",
      foodDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      price: "500 000 đ",
    },
  ];

  return (
    <View style={{ backgroundColor: "#B8D7D5" }}>
      <FullMenu height={height} marginLeft={-72} />
    </View>
    // <View style={styles.container}>
    //   <FullMenu width="100%" />

    //   <View style={styles.subContainer}>
    //     <View style={styles.leftMenu}>
    //       <View style={styles.topSubMenu}>
    //         <View style={styles.menuTitleContainer}>
    //           <Text style={styles.menuTitle}>Menu Title</Text>
    //         </View>
    //         {menuItems.map((item, index) => (
    //           <MenuItem
    //             key={index}
    //             imageSource={item.imageSource}
    //             foodName={item.foodName}
    //             foodDescription={item.foodDescription}
    //             price={item.price}
    //           />
    //         ))}
    //       </View>
    //       <View style={styles.bottomSubMenu}>
    //         <View
    //           style={[
    //             styles.menuTitleContainer,
    //             { marginTop: 6, marginLeft: 5 },
    //           ]}
    //         >
    //           <Text style={styles.menuTitle}>Menu Title</Text>
    //         </View>
    //         <View style={styles.bottomSubMenuComponent}>
    //           <View style={styles.bottomSubMenuTopComponent}>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //           </View>
    //           <View style={styles.bottomSubMenuTopComponent}>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.midMenu}>
    //       <View style={styles.topSubMenu}>
    //         <View style={styles.menuTitleContainer}>
    //           <Text style={styles.menuTitle}>Menu Title</Text>
    //         </View>
    //         {menuItems.map((item, index) => (
    //           <MenuItem
    //             key={index}
    //             imageSource={item.imageSource}
    //             foodName={item.foodName}
    //             foodDescription={item.foodDescription}
    //             price={item.price}
    //           />
    //         ))}
    //       </View>
    //       <View style={styles.bottomSubMenu}>
    //         <View
    //           style={[
    //             styles.menuTitleContainer,
    //             { marginTop: 6, marginLeft: 5 },
    //           ]}
    //         >
    //           <Text style={styles.menuTitle}>Menu Title</Text>
    //         </View>
    //         <View style={styles.bottomSubMenuComponent}>
    //           <View style={styles.bottomSubMenuTopComponent}>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //           </View>
    //           <View style={styles.bottomSubMenuTopComponent}>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //             <View style={styles.bottomSubMenuTopComponent_menuItem}>
    //               <View style={styles.bottomSubMenuTopComponent_menuItem_img}>
    //                 <Image
    //                   source={cafe}
    //                   style={{ height: "100%", width: "100%" }}
    //                 />
    //               </View>
    //               <View
    //                 style={styles.bottomSubMenuTopComponent_menuItem_content}
    //               >
    //                 <View
    //                   style={{
    //                     flexDirection: "row",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Text style={styles.foodName}>Food Name</Text>
    //                   <Text style={styles.foodName}>500 000 đ</Text>
    //                 </View>
    //                 <Text style={styles.foodDescription}>
    //                   Lorem Ipsum is simply dummy text of the printing and
    //                   typesetting industry
    //                 </Text>
    //               </View>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={styles.rightMenu}></View>
    //   </View>
    // </View>
  );
}

export default MenuRecommendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B8D7D5",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  subContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  leftMenu: {
    height: "100%",
    width: "33.33%",
  },
  midMenu: {
    height: "100%",
    width: "33.33%",
    backgroundColor: "rgba(111, 0, 0, 0.5)",
  },
  rightMenu: {
    height: "100%",
    width: "33.33%",
    backgroundColor: "rgba(999, 0, 0, 0.5)",
  },
  topSubMenu: {
    height: "48%",
    width: "100%",
    rowGap: 15,
    paddingBottom: 10,
  },
  bottomSubMenu: {
    height: "52%",
    width: "100%",
    rowGap: 15,
  },
  componentSubMenu: {
    height: "18%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  menuTitleContainer: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    fontSize: 20,
    marginTop: -10,
    marginLeft: -10,
    fontWeight: "bold",
    color: "#7AD7F4",
  },
  componentSubMenuTitle: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  menuImage: {
    height: "100%",
    width: "25%",
    marginLeft: -30,
  },
  contentImage: {
    height: "100%",
    width: "60%",
    flexDirection: "row",
  },
  contentImageLeft: {
    height: "100%",
    width: "70%",
    padding: 3,
    justifyContent: "center",
  },
  contentImageRight: {
    height: "100%",
    width: "30%",
    justifyContent: "center",
    color: "#5A3D41",
  },
  foodName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#5A3D41",
  },
  foodDescription: {
    fontSize: 11,
    color: "#5A3D41",
  },
  bottomSubMenuComponent: {
    height: "70%",
    width: "100%",
    rowGap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSubMenuTopComponent: {
    marginLeft: -30,
    height: "48%",
    width: "85%",
    flexDirection: "row",
    columnGap: 20,
  },
  bottomSubMenuBottomComponent: {
    marginLeft: -30,
    height: "48%",
    width: "85%",
  },
  bottomSubMenuTopComponent_menuItem: {
    height: "100%",
    width: "50%",
    flexDirection: "column",
  },
  bottomSubMenuTopComponent_menuItem_img: {
    height: "50%",
    width: "65%",
  },
  bottomSubMenuTopComponent_menuItem_content: {
    height: "50%",
    width: "100%",
  },
});
