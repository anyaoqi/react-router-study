import { Routes, Route, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";

// 样式定义
const styles = {
  wizardContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  wizardHeader: {
    textAlign: "center" as const,
    color: "#3a3a3a",
    borderBottom: "2px solid #eaeaea",
    paddingBottom: "15px",
    marginBottom: "30px",
  },
  step: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "25px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  stepTitle: {
    color: "#2c3e50",
    marginTop: "0",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  link: {
    display: "inline-block",
    padding: "10px 15px",
    backgroundColor: "#4a90e2",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  backLink: {
    backgroundColor: "#7f8c8d",
  },
  progressBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    position: "relative" as const,
  },
  progressLine: {
    position: "absolute" as const,
    top: "15px",
    left: "10%",
    right: "10%",
    height: "4px",
    backgroundColor: "#e0e0e0",
    zIndex: 1,
  },
  progressLineActive: {
    position: "absolute" as const,
    top: "15px",
    left: "10%",
    height: "4px",
    backgroundColor: "#4a90e2",
    zIndex: 2,
    transition: "width 0.3s ease",
  },
  progressStep: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    zIndex: 3,
    position: "relative" as const,
  },
  progressStepActive: {
    backgroundColor: "#4a90e2",
  },
  progressStepComplete: {
    backgroundColor: "#27ae60",
  },
  progressStepText: {
    marginTop: "10px",
    fontSize: "12px",
    color: "#7f8c8d",
    textAlign: "center" as const,
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  error: {
    color: "#e74c3c",
    marginTop: "5px",
    fontSize: "14px",
  },
  summary: {
    backgroundColor: "#f5f5f5",
    padding: "15px",
    borderRadius: "4px",
    marginTop: "20px",
  },
  summaryItem: {
    margin: "8px 0",
  },
  summaryLabel: {
    fontWeight: "bold",
    display: "inline-block",
    width: "120px",
  },
};

// 进度指示器组件
function ProgressIndicator({ currentStep }: { currentStep: number }) {
  const totalSteps = 3;
  const progressWidth = `${((currentStep - 1) / (totalSteps - 1)) * 80}%`;

  return (
    <div>
      <div style={styles.progressBar}>
        <div style={styles.progressLine}></div>
        <div
          style={{ ...styles.progressLineActive, width: progressWidth }}
        ></div>

        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              display: "flex",
              flexDirection: "column" as const,
              alignItems: "center",
            }}
          >
            <div
              style={{
                ...styles.progressStep,
                ...(step === currentStep ? styles.progressStepActive : {}),
                ...(step < currentStep ? styles.progressStepComplete : {}),
              }}
            >
              {step < currentStep ? "✓" : step}
            </div>
            <div style={styles.progressStepText}>步骤 {step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 创建向导上下文
interface WizardData {
  name: string;
  email: string;
  plan: string;
  agreeTerms: boolean;
}

export default function Wizard() {
  const location = useLocation();
  const [wizardData, setWizardData] = useState<WizardData>({
    name: "",
    email: "",
    plan: "基础版",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<
    Partial<WizardData & { general: string }>
  >({});

  // 更新表单数据
  const updateData = (field: keyof WizardData, value: any) => {
    setWizardData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 清除相关错误
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 验证表单数据
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<WizardData & { general: string }> = {};

    if (step === 1) {
      if (!wizardData.name.trim()) {
        newErrors.name = "请输入您的姓名";
      }

      if (!wizardData.email.trim()) {
        newErrors.email = "请输入您的电子邮箱";
      } else if (!/\S+@\S+\.\S+/.test(wizardData.email)) {
        newErrors.email = "请输入有效的电子邮箱地址";
      }
    } else if (step === 2) {
      if (!wizardData.plan) {
        newErrors.plan = "请选择一个计划";
      }
    } else if (step === 3) {
      if (!wizardData.agreeTerms) {
        newErrors.agreeTerms = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 确定当前步骤
  let currentStep = 1;
  if (location.pathname.includes("step-2")) {
    currentStep = 2;
  } else if (location.pathname.includes("step-3")) {
    currentStep = 3;
  }

  return (
    <div style={styles.wizardContainer}>
      <h1 style={styles.wizardHeader}>向导组件示例</h1>
      <ProgressIndicator currentStep={currentStep} />
      <Routes>
        <Route
          index
          element={
            <StepOne
              data={wizardData}
              updateData={updateData}
              errors={errors}
              validateStep={() => validateStep(1)}
            />
          }
        />
        <Route
          path="step-2"
          element={
            <StepTwo
              data={wizardData}
              updateData={updateData}
              errors={errors}
              validateStep={() => validateStep(2)}
            />
          }
        />
        <Route
          path="step-3"
          element={
            <StepThree
              data={wizardData}
              updateData={updateData}
              errors={errors}
              validateStep={() => validateStep(3)}
            />
          }
        />
      </Routes>
    </div>
  );
}

// 步骤组件定义
function StepOne({
  data,
  updateData,
  errors,
  validateStep,
}: {
  data: WizardData;
  updateData: (field: keyof WizardData, value: any) => void;
  errors: Partial<WizardData & { general: string }>;
  validateStep: () => boolean;
}) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (validateStep()) {
      navigate("step-2");
    }
  };

  return (
    <div style={styles.step}>
      <h2 style={styles.stepTitle}>个人信息</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>姓名</label>
        <input
          type="text"
          style={styles.input}
          value={data.name}
          onChange={(e) => updateData("name", e.target.value)}
          placeholder="请输入您的姓名"
        />
        {errors.name && <div style={styles.error}>{errors.name}</div>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>邮箱</label>
        <input
          type="email"
          style={styles.input}
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          placeholder="请输入您的电子邮箱"
        />
        {errors.email && <div style={styles.error}>{errors.email}</div>}
      </div>

      <div style={styles.navigation}>
        <div></div> {/* 占位元素，保持导航对齐 */}
        <button onClick={handleNext} style={styles.link}>
          下一步
        </button>
      </div>
    </div>
  );
}

function StepTwo({
  data,
  updateData,
  errors,
  validateStep,
}: {
  data: WizardData;
  updateData: (field: keyof WizardData, value: any) => void;
  errors: Partial<WizardData & { general: string }>;
  validateStep: () => boolean;
}) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (validateStep()) {
      navigate("step-3");
    }
  };

  return (
    <div style={styles.step}>
      <h2 style={styles.stepTitle}>选择套餐</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>可用套餐</label>
        <div>
          {["基础版", "标准版", "高级版"].map((plan) => (
            <div key={plan} style={{ marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  checked={data.plan === plan}
                  onChange={() => updateData("plan", plan)}
                  style={{ marginRight: "10px" }}
                />
                {plan}{" "}
                {plan === "基础版"
                  ? "- 免费"
                  : plan === "标准版"
                  ? "- ¥99/月"
                  : "- ¥299/月"}
              </label>
            </div>
          ))}
        </div>
        {errors.plan && <div style={styles.error}>{errors.plan}</div>}
      </div>

      <div style={styles.navigation}>
        <Link to="." style={{ ...styles.link, ...styles.backLink }}>
          上一步
        </Link>
        <button onClick={handleNext} style={styles.link}>
          下一步
        </button>
      </div>
    </div>
  );
}

function StepThree({
  data,
  updateData,
  errors,
  validateStep,
}: {
  data: WizardData;
  updateData: (field: keyof WizardData, value: any) => void;
  errors: Partial<WizardData & { general: string }>;
  validateStep: () => boolean;
}) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (validateStep()) {
      alert("表单提交成功！");
      // 在实际应用中，这里会提交数据到服务器
    }
  };

  return (
    <div style={styles.step}>
      <h2 style={styles.stepTitle}>确认信息</h2>

      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>姓名:</span>
          <span>{data.name}</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>邮箱:</span>
          <span>{data.email}</span>
        </div>
        <div style={styles.summaryItem}>
          <span style={styles.summaryLabel}>套餐:</span>
          <span>{data.plan}</span>
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={data.agreeTerms}
            onChange={(e) => updateData("agreeTerms", e.target.checked)}
            style={{ marginRight: "10px" }}
          />
          我同意条款和条件
        </label>
        {errors.agreeTerms && (
          <div style={styles.error}>您必须同意条款和条件</div>
        )}
      </div>

      <div style={styles.navigation}>
        <Link to="step-2" style={{ ...styles.link, ...styles.backLink }}>
          上一步
        </Link>
        <button onClick={handleSubmit} style={styles.link}>
          提交
        </button>
      </div>
    </div>
  );
}
