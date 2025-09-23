export class KikuListData {
  'total_count': number;
  'total_pages': number;
  'current_page': number;
  'per_page': number;
  items: KikuMetadata[];
}

export class KikuMetadata {
  'id': string;
  'youtube_id': string;
  'channel_id': string;
  'channel_name': string;
  'title': string;
  'description': string;
  'thumbnail_url': string;
  'live_broadcast_content': string;
  'published_at': string;
  'metrics_captured_at': string;
  'duration_seconds': number;
  'latest_view_count': number;
  'latest_like_count': number;
  'latest_comment_count': number;
  'is_transcribed': boolean;
}

export class KikuRaw extends KikuMetadata {
  transcription_result: {
    id: string;
    video_id: string;
    created_at: string;
    transcription_raw: string;
  };
  transcription_row: {
    id: string;
    video_id: string;
    start_time: number;
    end_time: number;
    start_time_str: string;
    end_time_str: string;
    text: string;
  }[];
}
