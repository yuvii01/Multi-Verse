import { useState } from "react";
import styled from "styled-components";
import { Container } from "../../styles/Styles";
import { dummyInventory } from "../../assets/Inventory.js";

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ItemCard = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const ItemInfo = styled.div`
  flex: 1;
  min-width: 250px;

  p {
    margin: 4px 0;
    font-size: 15px;
  }

  .status {
    font-weight: 500;
    &.Approved {
      color: green;
    }
    &.Rejected {
      color: red;
    }
    &.Pending {
      color: #f9a825;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  background-color: ${(props) => (props.approve ? "#388e3c" : "#d32f2f")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.approve ? "#2e7d32" : "#c62828")};
  }
`;

const InventoryManagement = () => {
    const [items, setItems] = useState(dummyInventory);

    const handleAction = (id, action) => {
        const updatedItems = items.map((item) =>
            item.id === id ? { ...item, status: action } : item
        );
        setItems(updatedItems);
    };

    return (
        <Container>
            <Title>Inventory Management</Title>

            <div style={{ height: "70vh", overflowY: "auto" }}>

                {items.map((item) => (
                    <ItemCard key={item.id}>
                        <ItemInfo>
                            <p><strong>Item Name:</strong> {item.name}</p>
                            <p><strong>Item ID:</strong> {item.id}</p>
                            <p><strong>Category:</strong> {item.category}</p>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Purchase Date:</strong> {item.purchaseDate}</p>
                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`status ${item.status}`}>{item.status}</span>
                            </p>
                        </ItemInfo>

                        {item.status === "Pending" && (
                            <ButtonGroup>
                                <ActionButton approve onClick={() => handleAction(item.id, "Approved")}>
                                    Approve
                                </ActionButton>
                                <ActionButton onClick={() => handleAction(item.id, "Rejected")}>
                                    Reject
                                </ActionButton>
                            </ButtonGroup>
                        )}
                    </ItemCard>
                ))}
            </div>
        </Container>
    );
};

export default InventoryManagement;
