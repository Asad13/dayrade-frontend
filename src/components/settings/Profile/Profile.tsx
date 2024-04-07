import { useCallback, useState, useRef, ChangeEvent } from 'react';
import DoubleInput from '@components/form/DoubleInput';
import FlagCountrySelect from '@components/form/FlagCountrySelect';
import type { CountryCode } from '@apptypes/form';
import FormRow from '../common/FormRow';
import {
  LabelInputTwin,
  type LabelInputPropsWithAttributes,
  Input,
  TextArea,
  ToggleBox,
} from '@ui/form';

const initialErrorMsgs = {
  name: '',
  user_name: '',
  country: '',
};

const socialProfilesInputFields: Array<LabelInputPropsWithAttributes> = [
  {
    type: 'text',
    name: 'twitch_id',
    label: 'twitch.com/',
    defaultValue: '',
    placeholder: 'Enter your Twitch account ID',
  },
  {
    type: 'text',
    name: 'discord_id',
    label: 'discord.com/',
    defaultValue: '',
    placeholder: 'Enter your Discord account ID',
  },
  {
    type: 'text',
    name: 'twitter_id',
    label: 'twitter.com/',
    defaultValue: '',
    placeholder: 'Enter your Twitter account ID',
  },
  {
    type: 'text',
    name: 'instagram_id',
    label: 'instagram.com/',
    defaultValue: '',
    placeholder: 'Enter your Instagram account ID',
  },
  {
    type: 'text',
    name: 'linked_id',
    label: 'linked.com/profile/',
    defaultValue: '',
    placeholder: 'Enter your LinkedIn account ID',
  },
];

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<typeof initialErrorMsgs>({
    ...initialErrorMsgs,
  });

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const profileImage = useRef<HTMLImageElement>(null);

  const [profilePicSrc, setProfilePicSrc] = useState<string | null>(null);
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);
  const [showDeleteImageDialogue, setShowDeleteImageDialogue] = useState(false);

  const [country, setCountry] = useState<CountryCode>('');

  const validate = useCallback((): boolean => {
    const isValid = true;

    // if (!isValid) {
    //   setErrors((prevs) => ({
    //     ...prevs,
    //     ...newErrorMsgs,
    //   }));
    // }

    return isValid;
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (isSubmitting) return;

      const isValid = validate();

      if (isValid) {
        // submit form
        setIsSubmitting(true);

        try {
          //
        } catch (error: any) {
          console.error(error);
          console.log(errors);

          if (
            error?.response?.data?.errors != null &&
            error?.response?.data?.errors !== undefined
          ) {
            setErrors((prevs) => ({
              ...prevs,
              ...error?.response?.data?.errors,
            }));
          }
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validate, isSubmitting, errors],
  );

  return (
    <>
      {showDeleteImageDialogue && <div>Will add model later</div>}
      <div className={`settings-tabpanel-heading-container`}>
        <h3 className={`heading3`}>Profile</h3>
        <p className={`text2 tw-text-textSecondary`}>
          Update your photo and profile details here.
        </p>
      </div>
      <div>
        <form
          method="post"
          acceptCharset="UTF-8"
          className="settings-tabs-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormRow label="Name">
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <DoubleInput
                  firstInput={{
                    type: 'text',
                    name: 'first_name',
                    defaultValue: 'First Name',
                    ref: firstNameRef,
                    disabled: true,
                  }}
                  secondInput={{
                    type: 'text',
                    name: 'last_name',
                    defaultValue: 'Last Name',
                    ref: lastNameRef,
                    disabled: true,
                  }}
                />
              </div>
              <div className="settings-checkbox-field-container">
                <span>Private</span>
                <ToggleBox name="show_name" />
                <span>Public</span>
              </div>
            </div>
          </FormRow>
          <FormRow label="Age">
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <DoubleInput
                  firstInput={{
                    type: 'text',
                    name: 'birth_date',
                    defaultValue: '22/02/1990',
                    ref: firstNameRef,
                    disabled: true,
                  }}
                  secondInput={{
                    type: 'text',
                    name: 'age',
                    defaultValue: '34',
                    ref: lastNameRef,
                    disabled: true,
                  }}
                />
              </div>
              <div className="settings-checkbox-field-container">
                <span>Private</span>
                <ToggleBox name="show_birth_date" />
                <span>Public</span>
              </div>
            </div>
          </FormRow>
          <FormRow label="Username">
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <LabelInputTwin
                  {...{
                    type: 'text',
                    name: 'user_name',
                    label: 'dayrade.com/',
                    defaultValue: '',
                    placeholder: "Your's Dayrade username",
                  }}
                  labelClassNames="settings-label"
                  inputClassNames="settings-input"
                  inputErrorClassNames="form-control-error"
                />
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <FormRow label="Social Profiles">
            <>
              {socialProfilesInputFields.map((fieldValue) => (
                <div className="settings-input-container" key={fieldValue.name}>
                  <div className="settings-input-field-container">
                    <LabelInputTwin
                      {...fieldValue}
                      labelClassNames="settings-label"
                      inputClassNames="settings-special-input"
                      inputErrorClassNames="form-control-error"
                    />
                  </div>
                  <div className="settings-checkbox-field-container">
                    <span>Private</span>
                    <ToggleBox name={`show_${fieldValue.name}`} />
                    <span>Public</span>
                  </div>
                </div>
              ))}
            </>
          </FormRow>
          <FormRow
            label="Your Photo"
            supportingText="This will be displayed on your profile."
          >
            <div className="settings-input-container">
              <div className="settings-input-field-container settings-image-field-container">
                <div>
                  <span>
                    <img
                      className={`settings-profile-image`}
                      ref={profileImage}
                      src={
                        newProfilePic
                          ? URL.createObjectURL(newProfilePic)
                          : profilePicSrc
                            ? profilePicSrc
                            : '/images/avatar.png'
                      }
                      alt={''}
                    />
                  </span>
                </div>
                <div className="settings-profile-image-file-input-container">
                  <button
                    type="button"
                    className={`setings-profile-image-delete-btn`}
                    onClick={() => {
                      setShowDeleteImageDialogue(true);
                    }}
                  >
                    Delete
                  </button>
                  <label
                    htmlFor="profile_pic"
                    className={'custom-input-label setings-profile-image-label'}
                  >
                    {profilePicSrc != null ? 'Update' : 'Upload'}
                  </label>
                  <input
                    type="file"
                    className={'custom-input'}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files.length > 0) {
                        setNewProfilePic(event.target.files[0]);
                        setProfilePicSrc('');
                      }
                    }}
                    id="profile_pic"
                    name="profile_pic"
                    accept="image/jpg, image/png, image/jpeg"
                  />
                </div>
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <FormRow
            label="Your bio"
            supportingText="Write a short introduction."
          >
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <TextArea
                  name="bio"
                  classNames="settings-textarea"
                  placeholder="Tell everyone something about you..."
                />
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <FormRow label="Job title">
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <Input
                  type="text"
                  name="job_title"
                  classNames="settings-input"
                  placeholder="Your's job title"
                />
                <div className="settings-job-title-checkbox-container">
                  <input
                    type="checkbox"
                    name="show_job_title"
                    id="show_job_title"
                    className="checkbox-radio"
                  />
                  <label
                    htmlFor="show_job_title"
                    className="checkbox-radio-label"
                  >
                    Show my job title in my profile
                  </label>
                </div>
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <FormRow label="Country">
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <FlagCountrySelect
                  selectedCountry={country}
                  setSelectedCountry={(countryCode: CountryCode) =>
                    setCountry(countryCode)
                  }
                  isError={errors.country !== ''}
                />
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <FormRow
            label="Alternative contact email"
            supportingText="Enter an alternative email if you’d like to be contacted via a different email."
          >
            <div className="settings-input-container">
              <div className="settings-input-field-container">
                <Input
                  type="email"
                  name="alt_email"
                  classNames="settings-input"
                  placeholder="Set alternative email"
                />
              </div>
              <div className="settings-checkbox-field-container"></div>
            </div>
          </FormRow>
          <div className="settings-profile-btn-container">
            <input
              type="reset"
              className={`form-btn text2 ${
                isSubmitting && 'form-btn-submitting '
              }`}
              value="Cancel"
            />
            <input
              type="submit"
              className={`form-btn text2 ${
                isSubmitting && 'form-btn-submitting '
              }`}
              value="Save"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
