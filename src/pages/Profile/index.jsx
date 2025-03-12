import React from "react";
import { useAsync } from "../../hooks/useAsync";
import { userServices } from "../../services/user";
import { useForm } from "../../hooks/useForm";
import { regex, required } from "../../utilities/validate";
import { handleError } from "../../utilities/handleError";
import FormField from "../../components/FormField";
import { useAuth } from "../../components/AuthContext";
import { Button } from "../../components/Button";
import { message } from "antd";

const Profile = () => {
  const { user, setUser } = useAuth();

  const { loading, execute: updateInfoService } = useAsync(
    userServices.updateInfo
  );

  const { register, values, validate } = useForm(
    {
      name: [required()],
      phone: [required(), regex("phone")],
      fb: [required(), regex("url")],
    },
    user
  );

  const onSubmit = async () => {
    try {
      if (validate()) {
        const res = await updateInfoService(values);
        setUser(res.data);
        message.success("Update Account Successfully");
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="tab1">
      <FormField
        {...register("name")}
        placeholder="Nguyễn Thanh Hải"
        label="Họ Và Tên"
        required
      />
      <FormField
        {...register("phone")}
        placeholder="0901****"
        label="Sớ Điện Thoại"
        required
      />
      <FormField {...register("username")} disabled label="Email" />
      <FormField
        {...register("fb")}
        label="Link Facebook"
        placeholder="Facebook url"
      />

      <Button loading={loading} onClick={onSubmit}>
        LƯU LẠI
      </Button>
    </div>
  );
};

export default Profile;

//xem lại bài 45
