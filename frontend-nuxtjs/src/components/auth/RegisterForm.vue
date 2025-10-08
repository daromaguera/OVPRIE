<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// Form data
const formData = reactive({
  email: '',
  verificationCode: '',
  salutation: '',
  firstName: '',
  middleInitial: '',
  lastName: '',
  website: '',
  publishedArticles: [{ title: '', yearPub: '', doi: '' }],
  institution: '',
  department: '',
  researchCenterOffice: 0,
  otherResearchCenter: '',
  contactNo: '',
  highestDegree: 0,
  otherDegree: '',
  password: '',
  confirmPassword: ''
});

// Form validation
const errors = reactive({
  email: '',
  verificationCode: '',
  salutation: '',
  firstName: '',
  lastName: '',
  website: '',
  institution: '',
  department: '',
  researchCenterOffice: '',
  otherResearchCenter: '',
  highestDegree: '',
  otherDegree: '',
  password: '',
  confirmPassword: ''
});

// UI states
const isSendingCode = ref(false);
const isVerifying = ref(false);
const isSubmitting = ref(false);
const isCodeVerified = ref(false);

// Options for dropdowns
interface ResearchCenterOption {
  value: number;
  label: string;
}

const researchCenterOptions = ref<ResearchCenterOption[]>([]);
const researchCentersLoading = ref(false);

interface DegreeOption {
  value: number;
  label: string;
}

const degreeOptions = ref<DegreeOption[]>([]);
const degreesLoading = ref(false);

const isLoading = ref(false);
const isFormValid = ref(false);

// Fetch both research centers and degrees from a single API
const fetchFormOptions = async () => {
  researchCentersLoading.value = true;
  degreesLoading.value = true;
  
  try {
    console.log('🔍 Fetching form options...');
    const response = await fetch('http://localhost:3001/api/form-options');
    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    if (response.ok) {
      const result = await response.json();
      console.log('📊 Raw data received:', result);
      
      if (result.status === 'success' && result.data) {
        // Process research centers
        const researchCentersData = result.data.researchCenters;
        if (Array.isArray(researchCentersData) && researchCentersData.length > 0) {
          // Sort the data to put "Other" at the end
          const sortedResearchCenters = researchCentersData.sort((a: any, b: any) => {
            if (a.name === 'Other') return 1;
            if (b.name === 'Other') return -1;
            return a.name.localeCompare(b.name);
          });
          
          researchCenterOptions.value = [
            { value: 0, label: 'Click here' },
            ...sortedResearchCenters.map((center: any) => ({
              value: center.id,
              label: center.name
            }))
          ];
          console.log('✅ Processed research center options:', researchCenterOptions.value);
        } else {
          console.warn('⚠️ No research centers data or empty array received');
          researchCenterOptions.value = [{ value: 0, label: 'Click here' }];
        }
        
        // Process degrees
        const degreesData = result.data.degrees;
        if (Array.isArray(degreesData) && degreesData.length > 0) {
          // Sort the data to put "Other" at the end
          const sortedDegrees = degreesData.sort((a: any, b: any) => {
            if (a.name === 'Other') return 1;
            if (b.name === 'Other') return -1;
            return a.name.localeCompare(b.name);
          });
          
          degreeOptions.value = [
            { value: 0, label: 'Click here' },
            ...sortedDegrees.map((degree: any) => ({
              value: degree.id,
              label: degree.name
            }))
          ];
          console.log('✅ Processed degree options:', degreeOptions.value);
        } else {
          console.warn('⚠️ No degrees data or empty array received');
          degreeOptions.value = [{ value: 0, label: 'Click here' }];
        }
      } else {
        console.error('❌ API returned error status:', result);
        setFallbackOptions();
      }
    } else {
      console.error('❌ Failed to fetch form options, status:', response.status);
      setFallbackOptions();
    }
  } catch (error) {
    console.error('❌ Error fetching form options:', error);
    setFallbackOptions();
  } finally {
    researchCentersLoading.value = false;
    degreesLoading.value = false;
  }
};

// Fallback options when API fails
const setFallbackOptions = () => {
  // Research centers fallback
  researchCenterOptions.value = [
    { value: 0, label: 'Click here' },
    { value: 1, label: 'Academic Affairs Office' },
    { value: 2, label: 'Administrative Office' },
    { value: 3, label: 'Extension Office' },
    { value: 4, label: 'Research and Development Center' },
    { value: 5, label: 'Student Affairs Office' },
    { value: 6, label: 'Technology Transfer and Licensing Office' },
    { value: 9, label: 'Other' }
  ];
  
  // Degrees fallback
  degreeOptions.value = [
    { value: 0, label: 'Click here' },
    { value: 1, label: 'Bachelor of Arts' },
    { value: 2, label: 'Bachelor of Engineering' },
    { value: 3, label: 'Bachelor of Science' },
    { value: 4, label: 'Currently Pursuing Bachelor\'s' },
    { value: 5, label: 'Currently Pursuing Master\'s' },
    { value: 6, label: 'Currently Pursuing PhD' },
    { value: 7, label: 'Doctor of Medicine' },
    { value: 8, label: 'Doctor of Philosophy' },
    { value: 9, label: 'Doctor of Science' },
    { value: 10, label: 'Master of Arts' },
    { value: 11, label: 'Master of Business Administration' },
    { value: 12, label: 'Master of Science' },
    { value: 13, label: 'Post-Doctoral Fellowship' },
    { value: 14, label: 'Other' }
  ];
};

// Methods
const sendVerificationCode = async () => {
  if (!formData.email) {
    errors.email = 'Email is required';
    return;
  }
  
  isSendingCode.value = true;
  try {
    // TODO: Implement API call to send verification code
    console.log('Sending verification code to:', formData.email);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    isSendingCode.value = false;
  } catch (error) {
    isSendingCode.value = false;
    console.error('Error sending verification code:', error);
  }
};

const verifyCode = async () => {
  if (!formData.verificationCode || formData.verificationCode.length !== 6) {
    errors.verificationCode = 'Please enter a 6-digit code';
    return;
  }
  
  isVerifying.value = true;
  try {
    // TODO: Implement API call to verify code
    console.log('Verifying code:', formData.verificationCode);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    isCodeVerified.value = true;
    isVerifying.value = false;
  } catch (error) {
    isVerifying.value = false;
    errors.verificationCode = 'Invalid verification code';
  }
};

const addPublishedArticle = () => {
  formData.publishedArticles.push({ title: '', yearPub: '', doi: '' });
};

const removePublishedArticle = (index: number) => {
  if (formData.publishedArticles.length > 1) {
    formData.publishedArticles.splice(index, 1);
  }
};

const validateForm = (showErrors = true) => {
  let isValid = true;
  
  // Reset errors only if showing errors
  if (showErrors) {
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = '';
    });
  }
  
  // Required field validation
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }else{
    errors.email = '';
  }
  
  if (!formData.salutation) {
    errors.salutation = 'Salutation is required';
    isValid = false;
  }else{
    errors.salutation = '';
  }
  
  if (!formData.firstName) {
    errors.firstName = 'First name is required';
    isValid = false;
  }else{
    errors.firstName = '';
  }
  
  if (!formData.lastName) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }else{
    errors.lastName = '';
  }
  
  if (!formData.institution) {
    errors.institution = 'Institution is required';
    isValid = false;
  }else{
    errors.institution = '';
  }
  
  if (!formData.department) {
    errors.department = 'Department is required';
    isValid = false;
  }else{
    errors.department = '';
  }
  
  if (!formData.researchCenterOffice) {
    errors.researchCenterOffice = 'Research center or office is required';
    isValid = false;
  }else{
    errors.researchCenterOffice = '';
  }
  
  // Validate other research center if "Other" is selected
  if (formData.researchCenterOffice === 9 && !formData.otherResearchCenter.trim()) {
    errors.otherResearchCenter = 'Please specify your research center or office';
    isValid = false;
  }else{
    errors.otherResearchCenter = '';
  }
  
  if (!formData.highestDegree) {
    errors.highestDegree = 'Highest degree is required';
    isValid = false;
  }else{
    errors.highestDegree = '';
  }
  
  // Validate other degree if "Other" is selected
  if (formData.highestDegree === 14 && !formData.otherDegree.trim()) {
    errors.otherDegree = 'Please specify your degree';
    isValid = false;
  }else{
    errors.otherDegree = '';
  }
  
  if (!formData.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }else{
    errors.password = '';
  }
  
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

// Watch form data changes to update form validity
watch(formData, () => {
  isFormValid.value = validateForm(false); // Don't show errors during validation
}, { deep: true });

// Fetch research centers and degrees when component mounts
onMounted(() => {
  fetchFormOptions();
});

const handleSubmit = async () => {
  if (!validateForm(true)) { // Show errors on submission
    return;
  }
  
  isSubmitting.value = true;
  try {
    console.log('Submitting registration:', formData);
    
    const response = await fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        salutation: formData.salutation,
        firstName: formData.firstName,
        middleInitial: formData.middleInitial,
        lastName: formData.lastName,
        website: formData.website,
        publishedArticles: formData.publishedArticles.filter(article => 
          article.title.trim() !== '' || article.yearPub.trim() !== '' || article.doi.trim() !== ''
        ),
        institution: formData.institution,
        department: formData.department,
        researchCenterOffice: formData.researchCenterOffice,
        otherResearchCenter: formData.otherResearchCenter,
        contactNo: formData.contactNo,
        highestDegree: formData.highestDegree,
        otherDegree: formData.otherDegree,
        password: formData.password,
      }),
    });

    const result = await response.json();
    console.log('Registration response:', result);

    if (result.status === 'success') {
      // Show success message
      alert('Registration successful! Please check your email for verification.');
      // Redirect to login page
      window.location.href = '/';
    } else {
      // Show error message
      if (result.error === 'EMAIL_EXISTS') {
        alert('A user with this email already exists. Please use a different email or try logging in.');
      } else {
        alert(`Registration failed: ${result.message}`);
      }
    }
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 pa-4">
    <!-- Header -->
    <div class="text-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Registration Form</h2>
      <p class="text-sm asterisk">Fields with asterisks (*) are required</p>
    </div>

    <!-- Email Verification Section -->
    <div class="space-y-4 my-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">
              Email <span class="asterisk">*</span>
            </label>
            <div class="">
                <v-text-field
                    v-model="formData.email"
                    type="email"
                    class="border-borderColor"
                    :class="{ 'border-red-500': errors.email }"
                    placeholder="Enter your email"
                    style="width:100%"
                />
            </div>
            <p v-if="errors.email" class="text-sm errorsRRll">{{ errors.email }}</p>
        </div>
    </div>
    
    <!-- Personal Information Section -->
    <div class="my-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Salutation (e.g, Dr., Engr., Atty., etc.) <span class="asterisk">*</span>
        </label>
        <v-text-field
          v-model="formData.salutation"
          type="text"
          class="border-borderColor"
          :class="{ 'border-red-500': errors.salutation }"
          placeholder="e.g. Dr., Engr., Atty."
          style="width:100%"
        />
        <p v-if="errors.salutation" class="text-red-500 text-sm errorsRRll">{{ errors.salutation }}</p>
      </div>
    </div>
    <!-- Name Fields Section -->
    <div class="d-flex my-4">
       <div class="me-1 sm:block" style="flex: 1;">
          <label class="text-sm font-medium text-gray-700 mb-1">
            First Name <span class="asterisk">*</span>
          </label><br>
          <v-text-field
            v-model="formData.firstName"
            type="text"
            class="border-borderColor"
            :class="{ 'border-red-500': errors.firstName }"
            placeholder="First name"
          />
          <p v-if="errors.firstName" class="text-red-500 text-sm errorsRRll">{{ errors.firstName }}</p>
        </div>

        <div class="me-1 sm:block" style="flex: 1;">
          <label class="text-sm font-medium text-gray-700 mb-1">
            Middle Initial (Opt.)
          </label><br>
          <v-text-field
            v-model="formData.middleInitial"
            type="text"
            class="border-borderColor"
            placeholder="M.I."
          />
        </div>

        <div class="sm:block" style="flex: 1;">
          <label class="text-sm font-medium text-gray-700 mb-1">
            Last Name <span class="asterisk">*</span>
          </label><br>
          <v-text-field
            v-model="formData.lastName"
            type="text"
            class="border-borderColor"
            :class="{ 'border-red-500': errors.lastName }"
            placeholder="Last name"
          />
          <p v-if="errors.lastName" class="text-red-500 text-sm errorsRRll">{{ errors.lastName }}</p>
        </div>
    </div>

    <!-- Published Articles Section -->
    <div class="space-y-4 my-4"> 
      <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
          Website (URL):
          </label><br>
          <v-text-field
          v-model="formData.website"
          type="url"
          class="border-borderColor"
          placeholder="https://example.com"
          style="width:100%"
          />
      </div>
    </div>
    <div :style="{
          border: formData.publishedArticles.length > 1 ? '1px solid #aeaeae' : 'none',
          borderRadius: formData.publishedArticles.length > 1 ? '10px' : '0',
          padding: formData.publishedArticles.length > 1 ? '15px' : '0',
          marginBottom: formData.publishedArticles.length > 1 ? '25px' : '0'
      }">
      <label class="block text-sm font-medium text-gray-700">
        Published Articles:
      </label>
      <div v-for="(article, index) in formData.publishedArticles" :key="index">
        <div class="d-flex gap-2" style="width:100%">
          <div class="" style="width:32%">
            <v-text-field
              v-model="article.title"
              type="text"
              class="border-borderColor"
              placeholder="Title"
            />
          </div>
          <div style="width:32%;margin-left:5px;">
            <v-text-field
              v-model="article.yearPub"
              type="number"
              class="border-borderColor"
              placeholder="Year Pub."
              min="1900"
              :max="new Date().getFullYear() + 1"
              style="width:100%"
            />
          </div>
          <div style="width: 35%;margin-left:5px;">
            <div class="flex-1">
              <v-text-field
                v-model="article.doi"
                type="text"
                class="border-borderColor"
                placeholder="DOI"
              />
            </div>
          </div>
          <div class="d-flex" :style="{
            'width': formData.publishedArticles.length > 1 ? '5%' : '0',
            'height': formData.publishedArticles.length > 1 ? '40px' : '0',
            'margin': formData.publishedArticles.length > 1 ? '2px' : '0',
            'margin-left': formData.publishedArticles.length > 1 ? '8px' : '0'
          }">
            <button
              v-if="formData.publishedArticles.length > 1"
              type="button"
              @click="removePublishedArticle(index)"
              class="text-white rounded-full hover:bg-red-700 flex items-center justify-center"
              style="background:#966754;padding:5px;cursor:pointer;border-radius:5px;color:white;margin-left:5px;"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        @click="addPublishedArticle"
        class="text-white rounded-full hover:bg-green-700 flex items-center justify-center float-right"
        style="background:#549677;padding:5px;cursor:pointer;border-radius:5px;color:white;width:50px;"
        >
        +
      </button>
      <br><br>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Institution <span class="asterisk">*</span>
      </label><br>
      <v-text-field
        v-model="formData.institution"
        type="text"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.institution }"
        placeholder="e.g. Caraga State University"
        style="width: 100%;"
      />
      <p v-if="errors.institution" class="text-red-500 text-sm errorsRRll">{{ errors.institution }}</p>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Department <span class="asterisk">*</span>
      </label><br>
      <v-text-field
        v-model="formData.department"
        type="text"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.department }"
        placeholder="e.g. IT Department"
        style="width:100%"
      />
      <p v-if="errors.department" class="text-red-500 text-sm errorsRRll">{{ errors.department }}</p>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Research Center or Office <span class="asterisk">*</span>
      </label><br>
      <v-select
        v-model="formData.researchCenterOffice"
        :items="researchCenterOptions"
        item-title="label"
        item-value="value"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.researchCenterOffice }"
        style="width:100%;"
        :loading="researchCentersLoading"
        placeholder="Loading research centers..."
        clearable
      />
      <p v-if="errors.researchCenterOffice" class="text-red-500 text-sm errorsRRll">{{ errors.researchCenterOffice }}</p>
    </div>

    <div v-if="formData.researchCenterOffice === 9" class="py-4 mt-n4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Other Research Center or Office, please specify:
      </label><br>
      <v-text-field
        v-model="formData.otherResearchCenter"
        type="text"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.otherResearchCenter }"
        placeholder="Specify your research center or office"
        style="width: 100%;"
      />
      <p v-if="errors.otherResearchCenter" class="text-red-500 text-sm errorsRRll">{{ errors.otherResearchCenter }}</p>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Contact No.:
      </label><br>
      <v-text-field
        v-model="formData.contactNo"
        type="tel"
        class="border-borderColor"
        placeholder="Phone number"
        style="width:100%"
      />
    </div>
    
    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Highest or Ongoing Degree Earned <span class="asterisk">*</span>
      </label><br>
      <v-select
        v-model="formData.highestDegree"
        :items="degreeOptions"
        item-title="label"
        item-value="value"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.highestDegree }"
        style="width:100%"
        :loading="degreesLoading"
        placeholder="Loading degrees..."
        clearable
      />
      <p v-if="errors.highestDegree" class="text-red-500 text-sm errorsRRll">{{ errors.highestDegree }}</p>
    </div>

    <div v-if="formData.highestDegree === 14" class="py-4 mt-n4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Others Degree Earned, please specify:
      </label><br>
      <v-text-field
        v-model="formData.otherDegree"
        type="text"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.otherDegree }"
        placeholder="Specify your degree"
        style="width: 100%;"
      />
      <p v-if="errors.otherDegree" class="text-red-500 text-sm errorsRRll">{{ errors.otherDegree }}</p>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Account Password <span class="asterisk">*</span>
      </label><br>
      <v-text-field
        v-model="formData.password"
        type="password"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.password }"
        placeholder="Enter password"
        style="width: 100%;"
      />
      <p v-if="errors.password" class="text-red-500 text-sm errorsRRll">{{ errors.password }}</p>
    </div>

    <div class="my-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Confirm Password <span class="asterisk">*</span>
      </label><br>
      <v-text-field
        v-model="formData.confirmPassword"
        type="password"
        class="border-borderColor"
        :class="{ 'border-red-500': errors.confirmPassword }"
        placeholder="Confirm password"
        style="width: 100%;"
      />
      <p v-if="errors.confirmPassword" class="text-red-500 text-sm errorsRRll">{{ errors.confirmPassword }}</p>
    </div>

    <!-- Submit Button -->
    <div class="mt-4">
      <v-btn
        size="large"
        rounded="pill"
        color="primary"
        class="rounded-pill"
        block
        type="submit"
        flat
        :loading="isSubmitting"
        :disabled="!isFormValid || isSubmitting"
    >
        <v-icon v-if="isSubmitting" class="mr-2">mdi-loading mdi-spin</v-icon>
        {{ isSubmitting ? 'Registering...' : 'Register' }}
    </v-btn>
    </div>
    <div class="mt-4">
      <h6 class="text-subtitle-1  text-grey100 d-flex justify-center align-center mt-3">
          Already have an Account?
          <v-btn variant="plain" to="/"
              class="text-primary text-body-1 opacity-1 font-weight-medium pl-2">Login</v-btn>
      </h6>
    </div>
  </form>
</template>

<style scoped>
.asterisk {
  color: red;
}
.errorsRRll{
  margin-top:-22px;
  font-size:13px;
  color:red;
}
</style>
