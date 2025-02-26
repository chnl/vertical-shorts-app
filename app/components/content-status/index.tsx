import { Link } from "@remix-run/react";

import type { Content } from "~/models/content.server";
import type { Project } from "~/models/project.server";
import { Routes } from "~/routes";

import styles from "./index.module.css";

export function ContentStatus({
  project,
  content,
  open,
}: {
  project: Project;
  content: Content;
  open?: boolean;
}) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
      hour12: true,
    });
  };

  return (
    <details className={styles.details} open={open}>
      <summary className={styles.summary}>Status</summary>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Channel</th>
            <th>Status</th>
            <th>Scheduled</th>
          </tr>
        </thead>
        <tbody>
          {project.channels.map((channel) => {
            switch (channel.channelType) {
              case "YOUTUBE":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      <a
                        href={`https://studio.youtube.com/video/${content.youtubeId}/edit`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {channel.channelType}
                      </a>
                    </td>
                    <td>{content.youtubeStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.youtubePublishAt
                          ? formatDate(content.youtubePublishAt)
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "TIKTOK":
                return (
                  <tr key={channel.channelType}>
                    <td>
                      <a
                        href={`https://www.tiktok.com/${project.tikTokCredentials?.handle}/video/${content.tikTokId}}`}
                      >
                        {channel.channelType}
                      </a>
                    </td>
                    <td>{content.tikTokStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.tikTokPublishAt
                          ? formatDate(content.tikTokPublishAt)
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "TWITTER":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.twitterStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.twitterPublishAt
                          ? formatDate(content.twitterPublishAt)
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "INSTAGRAM":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.instagramStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.instagramPublishAt
                          ? formatDate(content.instagramPublishAt)
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              case "FACEBOOK":
                return (
                  <tr key={channel.channelType}>
                    <td>{channel.channelType}</td>
                    <td>{content.facebookStatus}</td>
                    <td>
                      <Link to={Routes.AdminContentScheduler(content.slug)}>
                        {content.facebookPublishAt
                          ? formatDate(content.facebookPublishAt)
                          : "NONE"}
                      </Link>
                    </td>
                  </tr>
                );
              default:
                return null;
            }
          })}
        </tbody>
      </table>
    </details>
  );
}
