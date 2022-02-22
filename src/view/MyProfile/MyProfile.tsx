import classes from "./MyProfile.module.css";

import { AuthenticatedView } from "../../core/wrappers/AuthenticatedView";
import { Input } from "../../components/UI/Input";
import { useSelectUser } from "../../core/hooks/SelectUser/useSelectUser";
import { isBoolean } from "../../utils/isCheckers/isBooleans";

type Props = {};

type Address = {
  city: string;
  postalCode: string;
  street: string;
  buildingNumber: number;
};

export const MyProfile = (props: Props) => {
  const { user } = useSelectUser();
  if (isBoolean(user)) {
    return null;
  }
  const address: Address = {
    city: user.city,
    postalCode: user.postalCode,
    street: user.street,
    buildingNumber: user.buildingNumber,
  };

  return (
    <AuthenticatedView>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classes.userDetails}>
            <div className={classes.pic} />
            <div className={classes.userData}>
              <p>
                {user.firstName} {user.lastName}
              </p>
              <p>{user.phoneNumber}</p>
              <p>{user.email}</p>
            </div>
          </div>
          <form className={classes.formBox}>
            <p>
              Adres: {address.street} {address.buildingNumber}
            </p>
            <p>
              {address.postalCode} {address.city}
            </p>
            <div className={classes.inputsBox}>
              <div className={classes.col}>
                <Input
                  id="phone"
                  placeholder="Phone number"
                  type="text"
                  labelText="Phone number:"
                  value={user.phoneNumber}
                />
                <Input
                  id="city"
                  placeholder="City"
                  type="text"
                  labelText="City:"
                  value={address.city}
                />
              </div>
              <div className={classes.col}>
                <Input
                  id="postalCode"
                  placeholder="Postal code"
                  type="text"
                  labelText="Postal-code:"
                  value={address.postalCode}
                />
                <Input
                  id="street"
                  placeholder="Street"
                  type="text"
                  labelText="Street:"
                  value={address.street}
                />
              </div>

              <div className={classes.col}>
                <Input
                  id="number"
                  placeholder="Building number"
                  type="text"
                  labelText="Building number:"
                  value={address.buildingNumber}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedView>
  );
};
