import * as React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Loader from "../progress";

export default function FormDialog(props) {
  console.log("props of dialog ---", props);
  return (
    <Modal isOpen={props.open} onClose={props.handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ fontWeight: "bold" }}>{props?.title}</ModalHeader>
        <ModalBody>{props.children && props.children}</ModalBody>
        <ModalFooter>
          {props.loader ? (
            <Loader style={{ marginRight: "20px", marginBottom: "10px" }} />
          ) : (
            <>
              <Button mr={3} onClick={props.handleClose}>
                Cancel
              </Button>
              <Button
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={props.handleSubmit}
              >
                {props.submitLabel ? props.submitLabel : "Add"}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// function VerticallyCenter() {
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   return (
//     <>
//       <Button onClick={onOpen}>Trigger modal</Button>

//       <Modal onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Lorem count={2} />
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }
