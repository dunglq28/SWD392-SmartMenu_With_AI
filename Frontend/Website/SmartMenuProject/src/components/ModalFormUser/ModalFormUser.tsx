import React from "react";
import {
  ModalBody,
  Flex,
  Box,
  Select,
  Input,
  Text,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import styles from "./ModalFormUser.module.scss"; 

const ModalFormUser: React.FC = () => {
  return (
    <ModalBody>
      <Flex direction="column" alignItems="stretch">
        <tbody>
          <Flex>
            <Text
              as="div"
              className={styles.textFontWeight}
              py={3}
              pr={3}
              ml={2}
            >
              Brand Name
            </Text>
            <Box flex={1} maxWidth="50%">
              <Select id="roleId" className={styles.roleId}>
                <option disabled hidden value="">
                  Select one
                </option>
              </Select>
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Full Name
              </Text>
              <Input placeholder="Full name" pl={3} />
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={2}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Username
              </Text>
              <Input placeholder="User name" pl={3} />
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3} ml={2}>
            <Box flex="1">
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Phone Number
              </Text>
              <Input placeholder="Phone number" />
            </Box>

            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Date of Birth
              </Text>
              <Input type="date" />
            </Box>
          </Flex>

          <Flex justify="space-between" mb={3}>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3} mb={2}>
                Gender
              </Text>
              <RadioGroup>
                <Stack spacing={5} direction="row" ml={3}>
                  <Radio value="1">
                    <Text className={styles.genderText}>Male</Text>
                  </Radio>
                  <Radio value="2">
                    <Text className={styles.genderText}>Female</Text>
                  </Radio>
                </Stack>
              </RadioGroup>
              <Box mt={2}>
                {/* {genderError && (
                  <span className={styles.errorMessage}>{genderError}</span>
                )} */}
              </Box>
            </Box>
            <Box flex="1" ml={3}>
              <Text className={styles.textFontWeight} py={3} pr={3}>
                Status
              </Text>
              <Select id="status" className={styles.status}>
                <option disabled hidden value="">
                  Select one
                </option>
              </Select>
            </Box>
          </Flex>
        </tbody>
      </Flex>
    </ModalBody>
  );
};

export default ModalFormUser;
