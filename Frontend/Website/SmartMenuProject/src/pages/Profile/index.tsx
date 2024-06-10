import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Image,
  Input,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import style from "./Profile.module.scss";
import { GoPerson } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { BsShield } from "react-icons/bs";
import { LuBell, LuCreditCard } from "react-icons/lu";

function Profile() {
  const [locationString, setLocationString] = useState<string>("");
  const [flag, setFlag] = useState<string>("");
  const apiGetLocation = import.meta.env.VITE_API_GET_LOCATION;
  useEffect(() => {
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + apiGetLocation)
      .then((response) => response.json())
      .then((data) => {
        console.log("User location:", data);
        const newLocationString = `Your current session seen in ${data.city}, ${data.state_prov}, ${data.country_name}`;
        setFlag(data.country_flag);
        setLocationString(newLocationString);
      })
      .catch((error) => {
        console.error("Error fetching user location:", error);
      });
  }, []);

  return (
    <Flex className={style.profile_container}>
      <Tabs w="80%">
        <Flex className={style.tabs_container}>
          <TabList className={style.tab_list}>
            <Tab
              _selected={{ color: "white", bg: "#5D5FEF" }}
              className={style.tab}
            >
              <GoPerson className={style.icon} />
              <Text className={style.tab_text}>Profile Information</Text>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#5D5FEF" }}
              className={style.tab}
            >
              <IoSettingsOutline className={style.icon} />
              <Text className={style.tab_text}>Account Settings</Text>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#5D5FEF" }}
              className={style.tab}
            >
              <BsShield className={style.icon} />
              <Text className={style.tab_text}>Sercurity</Text>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#5D5FEF" }}
              className={style.tab}
            >
              <LuBell className={style.icon} />
              <Text className={style.tab_text}>Notification</Text>
            </Tab>
            <Tab
              _selected={{ color: "white", bg: "#5D5FEF" }}
              className={style.tab}
            >
              <LuCreditCard className={style.icon} />
              <Text className={style.tab_text}>Billing</Text>
            </Tab>
          </TabList>

          <TabPanels className={style.tab_panels}>
            <TabPanel>
              <Flex className={style.tab_panels_container}>
                <Text className={style.tab_panels_container_title}>
                  YOUR PROFILE INFORMATION
                </Text>

                <Divider />

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>Full Name</Text>
                  <Input />
                  <Text className={style.text_content} color="#525252">
                    Your name may appear around here where you are mentioned.
                    You can change or remove it at any time.
                  </Text>
                </Flex>

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>Your Bio</Text>
                  <Input />
                </Flex>

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>URL</Text>
                  <Input />
                </Flex>

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>Location</Text>
                  <Input />
                  <Text className={style.text_content} color="#525252">
                    All of the fields on this page are optional and can be
                    deleted at any time, and by filling them out, you're giving
                    us consent to share this data wherever your user profile
                    appears.
                  </Text>
                </Flex>
                <Flex columnGap="5px">
                  <Button className={style.btn_content}>Update Profile</Button>
                  <Button>Reset Changes</Button>
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex className={style.tab_panels_container}>
                <Text className={style.tab_panels_container_title}>
                  ACCOUNT SETTINGS
                </Text>

                <Divider />

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>Username</Text>
                  <Input />
                  <Text className={style.text_content} color="#525252">
                    After changing your username, your old username becomes
                    available for anyone else to claim.
                  </Text>
                </Flex>
                <Divider />
                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content} color="red">
                    Delete Account
                  </Text>
                  <Text className={style.text_title_content} color="#525252">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </Text>
                </Flex>
                <Flex>
                  <Button className={style.btn_content}>Delete Account</Button>
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex className={style.tab_panels_container}>
                <Text className={style.tab_panels_container_title}>
                  SECURITY SETTINGS
                </Text>

                <Divider />

                <Flex className={style.tab_panels_container_content}>
                  <Text className={style.text_title_content}>
                    Change Password
                  </Text>
                  <Input placeholder="Enter your old password" />
                  <Input placeholder="New password" />
                  <Input placeholder="Confirm new password" />
                </Flex>

                <Divider />

                <Flex flexDir="column" rowGap="15px">
                  <Text className={style.text_title_content}>
                    Two Factor Authentication
                  </Text>
                  <Flex>
                    <Button className={style.btn_content}>
                      Enable two-factor authentication
                    </Button>
                  </Flex>
                  <Text className={style.text_content} color="#525252">
                    Two-factor authentication adds an additional layer of
                    security to your account by requiring more than just a
                    password to log in.
                  </Text>
                </Flex>
                <Divider />

                <Flex flexDir="column">
                  <Text className={style.text_title_content}>Sessions</Text>
                  <Text className={style.text_title_content} color="#525252">
                    This is a list of devices that have logged into your
                    account. Revoke any sessions that you do not recognize.
                  </Text>
                </Flex>

                <Flex alignItems="center" columnGap="20px">
                  <Text>
                    {locationString ? `${locationString}` : <Loading />}
                  </Text>
                  <Image src={flag} />
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel userSelect="none">
              <Flex flexDir="column" rowGap="15px">
                <Text className={style.tab_panels_container_title}>
                  NOTIFICATION SETTINGS
                </Text>
                <Divider />
                <Flex flexDir="column">
                  <Text className={style.text_title_content}>
                    Security Alerts
                  </Text>
                  <Text className={style.text_content} color="#525252">
                    Receive security alert notifications via email
                  </Text>
                </Flex>

                <Flex flexDir="column">
                  <Checkbox defaultChecked>
                    Email each time a vulnerability is found
                  </Checkbox>
                  <Checkbox defaultChecked>
                    Email a digest summary of vulnerability
                  </Checkbox>
                </Flex>
                <Flex flexDir="column">
                  <Text className={style.text_title_content}>
                    SMS Notifications
                  </Text>
                  <Flex flexDir="column" rowGap="5px">
                    <Stack border="1px solid #ccc" padding="20px">
                      <Text>Comments</Text>
                      <Switch size="sm" />
                    </Stack>
                    <Stack border="1px solid #ccc" padding="20px">
                      <Text>Updates From People</Text>
                      <Switch size="sm" />
                    </Stack>
                    <Stack border="1px solid #ccc" padding="20px">
                      <Text>Reminders</Text>
                      <Switch size="sm" />
                    </Stack>
                    <Stack border="1px solid #ccc" padding="20px">
                      <Text>Events</Text>
                      <Switch size="sm" />
                    </Stack>
                    <Stack border="1px solid #ccc" padding="20px">
                      <Text>Pages You Follow</Text>
                      <Switch size="sm" />
                    </Stack>
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column" rowGap="15px">
                <Text className={style.tab_panels_container_title}>
                  BILLING SETTINGS
                </Text>
                <Divider />
                <Flex flexDir="column">
                  <Text className={style.text_title_content}>
                    Payment Method
                  </Text>
                  <Text className={style.text_content} color="#525252">
                    You have not added a payment method
                  </Text>
                </Flex>
                <Flex>
                  <Button className={style.btn_content}>
                    Add Payment Method
                  </Button>
                </Flex>
                <Flex flexDir="column">
                  <Text className={style.text_title_content}>
                    Payment History
                  </Text>
                  <Flex
                    border="1px solid #ccc"
                    justifyContent="center"
                    alignItems="center"
                    padding="20px"
                  >
                    <Text className={style.text_title_content}>
                      You have not added a payment method
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
}

export default Profile;
