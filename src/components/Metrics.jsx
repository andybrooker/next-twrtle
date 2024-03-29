import { Typography } from "@mui/material";

export function Metrics({ metrics }) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <>
      {Object.entries(metrics).map(([key, value]) => (
        <Metric
          key={`${key}-${value}`}
          icon={key}
          metric={formatter.format(value)}
        />
      ))}
    </>
  );
}

const Metric = ({ icon, metric }) => {
  switch (icon) {
    case "retweet_count":
      return (
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
        >
          <div style={{ paddingTop: "4px" }}>
            <RetweetIcon />
          </div>
          <Typography fontWeight={500} variant="small">
            {metric}
          </Typography>
        </div>
      );
    case "reply_count":
      return (
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
        >
          <div style={{ paddingTop: "4px" }}>
            <ReplyIcon />
          </div>
          <Typography fontWeight={500} variant="small">
            {metric}
          </Typography>
        </div>
      );
    case "like_count":
      return (
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
        >
          <div style={{ paddingTop: "4px" }}>
            <LikeIcon />
          </div>
          <Typography fontWeight={500} variant="small">
            {metric}
          </Typography>
        </div>
      );
    case "quote_count":
      return (
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
        >
          <div style={{ paddingTop: "4px" }}>
            <QuoteIcon />
          </div>
          <Typography fontWeight={500} variant="small">
            {metric}
          </Typography>
        </div>
      );
    default:
      return <div></div>;
  }
};

const QuoteIcon = () => {
  return (
    <div>
      <svg
        width="0.75rem"
        height="0.75rem"
        viewBox="0 0 83 83"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1188 63.8556C11.3333 63.066 10.8592 61.968 10.4066 61.1766C10.2657 60.9406 10.1129 60.7119 9.94871 60.4915C6.06758 54.6055 3.99895 47.7101 3.9992 40.6598C3.9361 20.4224 20.7173 4 41.4685 4C59.5658 4 74.6721 16.5372 78.2021 33.1796C78.731 35.647 78.9981 38.1634 78.999 40.6868C78.999 60.953 62.865 77.6332 42.1139 77.6332C38.8146 77.6332 34.3615 76.8039 31.933 76.1242C29.5045 75.4445 27.0797 74.5431 26.4541 74.3015C25.8142 74.0556 25.1347 73.9291 24.4493 73.9283C23.7006 73.9255 22.9591 74.0745 22.2696 74.3664L10.0407 78.7799C9.77274 78.8953 9.48886 78.9695 9.19871 78.9998C8.96974 78.9991 8.74318 78.953 8.53216 78.8641C8.32114 78.7753 8.12985 78.6454 7.96937 78.4821C7.80889 78.3188 7.68242 78.1252 7.59728 77.9127C7.51213 77.7001 7.47001 77.4728 7.47335 77.2438C7.48839 77.0428 7.52465 76.844 7.58152 76.6507L11.1188 63.8556Z"
          stroke="currentColor"
          strokeWidth="8"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M65.5188 41.8371C65.1456 41.0995 64.3875 40.6341 63.5607 40.6341H58.4388V28.9268C58.4388 27.3098 57.129 26 55.5119 26H38.6827C37.0656 26 35.7558 27.3098 35.7558 28.9268C35.7558 30.5439 37.0656 31.8537 38.6827 31.8537H51.8534C52.2573 31.8537 52.5836 32.18 52.5851 32.5839V40.6341H47.4631C46.6363 40.6341 45.879 41.0995 45.5051 41.8371C45.1319 42.5761 45.2036 43.4615 45.6931 44.1273L53.7419 55.1029C54.1568 55.6671 54.8139 56 55.5119 56C56.21 56 56.8692 55.6671 57.2827 55.1029L65.3314 44.1273C65.8202 43.46 65.8927 42.5746 65.5188 41.8371ZM43.0729 50.1463H29.9022C29.507 50.1463 29.1924 49.8339 29.1763 49.4439L29.1705 41.3659H34.2924C35.1192 41.3659 35.8773 40.9005 36.2512 40.1629C36.6244 39.4239 36.5527 38.5385 36.0631 37.8727L28.0144 26.8971C27.6002 26.3329 26.9431 26 26.2436 26C25.5441 26 24.887 26.3329 24.4729 26.8971L16.4241 37.8727C15.9361 38.54 15.8629 39.4254 16.2375 40.1629C16.6107 40.9012 17.368 41.3659 18.1948 41.3659H23.3168L23.3256 53.0754C23.327 54.691 24.6368 56 26.2524 56H43.0744C44.69 56 46.0012 54.6902 46.0012 53.0732C46.0012 51.4561 44.69 50.1463 43.0744 50.1463H43.0729Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

const ReplyIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="0.75rem"
        viewBox="0 0 65 72"
      >
        <path
          fill="currentColor"
          d="M41 31h-9V19c0-1.14-.647-2.183-1.668-2.688-1.022-.507-2.243-.39-3.15.302l-21 16C5.438 33.18 5 34.064 5 35s.437 1.82 1.182 2.387l21 16c.533.405 1.174.613 1.82.613.453 0 .908-.103 1.33-.312C31.354 53.183 32 52.14 32 51V39h9c5.514 0 10 4.486 10 10 0 2.21 1.79 4 4 4s4-1.79 4-4c0-9.925-8.075-18-18-18z"
        />
      </svg>
    </div>
  );
};

const RetweetIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="0.75rem"
        viewBox="0 0 75 72"
      >
        <path
          fill="currentColor"
          d="M70.676 36.644C70.166 35.636 69.13 35 68 35h-7V19c0-2.21-1.79-4-4-4H34c-2.21 0-4 1.79-4 4s1.79 4 4 4h18c.552 0 .998.446 1 .998V35h-7c-1.13 0-2.165.636-2.676 1.644-.51 1.01-.412 2.22.257 3.13l11 15C55.148 55.545 56.046 56 57 56s1.855-.455 2.42-1.226l11-15c.668-.912.767-2.122.256-3.13zM40 48H22c-.54 0-.97-.427-.992-.96L21 36h7c1.13 0 2.166-.636 2.677-1.644.51-1.01.412-2.22-.257-3.13l-11-15C18.854 15.455 17.956 15 17 15s-1.854.455-2.42 1.226l-11 15c-.667.912-.767 2.122-.255 3.13C3.835 35.365 4.87 36 6 36h7l.012 16.003c.002 2.208 1.792 3.997 4 3.997h22.99c2.208 0 4-1.79 4-4s-1.792-4-4-4z"
        />
      </svg>
    </div>
  );
};

const LikeIcon = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="0.75rem"
        viewBox="0 0 54 72"
      >
        <path
          fill="currentColor"
          d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z"
        />
      </svg>
    </div>
  );
};
